import axios from "axios";
import {
  createUserWithEmailAndPassword,
  getAuth,
  getIdToken,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  User,
} from "firebase/auth";
import {
  updateUserIdToken,
  updateUserInfo,
} from "@components/system/redux/action";
import { useRouter } from "next/router";
import { FC, useEffect } from "react";
import store from "../redux/store";
import app from "./app";
import { useSelector } from "react-redux";
import { initState } from "../redux/userReducer";

export const auth = getAuth(app);

onAuthStateChanged(auth, async (user) => {
  // Load account data from firebase auth to redux state
  if (user) {
    const token = await getFirebaseToken();
    // Setup default header
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    store.dispatch(updateUserIdToken(token));
    // Fetch data from backend if the backend url is detected
    if (process.env.NEXT_PUBLIC_backend_url) {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_backend_url}/user/${user.email}`
        );
        store.dispatch(updateUserInfo({ ...user, ...response.data }));
      } catch (e) {
        console.log(e);
        store.dispatch(updateUserInfo({ ...user }));
      }
    } else {
      store.dispatch(updateUserInfo({ ...user }));
    }
  } else {
    store.dispatch(updateUserInfo(null));
  }
});

// A function which takes a string and return a promise | Resolve the given string if the string doesn't contain any forbidden char and reject if does
export const sanitizeInput = (unknown: string, type = typeof "a") => {
  return new Promise<string>((resolve, reject) => {
    if (typeof unknown === typeof "a") {
      if (
        unknown.includes(">") ||
        unknown.includes("<") ||
        unknown.includes("'") ||
        unknown.includes('""') ||
        unknown.includes("/") ||
        unknown.includes("\\") ||
        unknown.includes(" ")
      ) {
        reject("Invalid Char");
        return;
      }
      resolve(unknown);
    }
  });
};

// A function which takes a email string and return a promise | Resolve if the given string is in valid email format and reject if not
export const validateEmail = (unknown: string) => {
  return new Promise<string>((resolve, reject) => {
    var re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let result = re.test(String(unknown).toLowerCase());
    if (result) {
      resolve(unknown);
    } else {
      reject("Invalid Email");
    }
  });
};

export const handleLoginWithEmail = async (email: string, password: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (email == "" || password == "") throw "Empty email or password";
      await sanitizeInput(email);
      const validPass = await sanitizeInput(password);
      const validEmail = await validateEmail(email);
      const response = await signinEmail(validEmail, validPass);
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
};

export const handleRegisterWithEmail = async (
  email: string,
  password: string,
  username: string
) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (email == "" || password == "" || !auth.currentUser)
        throw "Empty email or password";
      await sanitizeInput(email);
      const validPass = await sanitizeInput(password);
      const validUsername = await sanitizeInput(username);
      const validEmail = await validateEmail(email);
      const response = await signupEmail(validEmail, validPass);
      console.log(response);
      updateProfile(auth.currentUser, {
        displayName: validUsername,
      });
      resolve(response);
    } catch (e) {
      reject(e);
    }
  });
};

// Async function which returns a promise | takes email and password to login the user in
export const signinEmail = async (email: string, password: string) => {
  return new Promise((resolve, reject) => {
    try {
      let response = signInWithEmailAndPassword(auth, email, password);
      resolve(response); // let authOnStateChange handle updating redux state
    } catch (e) {
      reject("An error has occured while trying to sign you in : " + e);
    }
  });
};

// Async function which returns promise | takes email and password to sign up the user
export const signupEmail = async (email: string, password: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = createUserWithEmailAndPassword(auth, email, password);
      resolve(response);
    } catch (err) {
      reject(
        "An error has occurred while trying to creating a new user : " + err
      );
    }
  });
};

export const SignOutFC: FC = () => {
  const router = useRouter();

  useEffect(() => {
    const cb = async () => {
      try {
        await signOut(auth);
        alert("Sucessfully signed out");
        router.push("/");
      } catch (e) {
        console.error("An error has occured");
        console.log(e);
      }
    };
    cb();
  }, []);

  return null;
};

export const SignOut = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      await signOut(auth);
      resolve(null);
    } catch (e) {
      reject(e);
    }
  });
};

/**
 * @param {Object} props
 * @param { (user : User | null , ready : boolean) => boolean} props.cb
 * @param {String} props.path
 */
export const ConditionalRedirect: FC<{
  cb: (fbProfile: User | null) => boolean;
  path: string;
}> = ({
  cb,
  path,
}: {
  cb: (fbProfile: User | null) => boolean;
  path: string;
}) => {
  const fbProfile = useSelector<initState, User | null>((state) => state.user);

  const router = useRouter();

  useEffect(() => {
    if (cb(fbProfile)) {
      router.push(path);
    }
  }, [fbProfile]);

  return null;
};

export const getFirebaseToken = async () => {
  return new Promise(async (resolve, reject) => {
    if (auth.currentUser) {
      const token = await getIdToken(auth.currentUser);
      resolve(token);
    } else {
      reject("Not signed in");
    }
  });
};

export const getNewIdToken = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      if (auth.currentUser) {
        const token = await getIdToken(auth.currentUser, true);
        resolve(token);
      } else {
        reject("Not signed in");
      }
    } catch (e) {
      reject(e);
    }
  });
};

let googleProvider: GoogleAuthProvider | null = null;

export const signinWithGooglePopUp = () => {
  if (!googleProvider) {
    googleProvider = new GoogleAuthProvider();
  }
  return new Promise(async (resolve, reject) => {
    if (!googleProvider) return reject("Fatal error");
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        resolve(user);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const refreshIdToken = async () => {
  if (auth.currentUser) {
    const token = await getFirebaseToken();
    store.dispatch(updateUserIdToken(token));
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
};
