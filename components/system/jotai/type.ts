export interface Profile {
  email: String;
  discordUserId?: String;
  uid: String;
  linkToken?: String;
  birth?: Date;
  school?: String;
  firstName?: String;
  lastName?: String;
  role: ["DEFAULT", "ADMIN"];
}
