import { useGLTF } from "@react-three/drei";

export function Chair(props: any) {
  const { scene } = useGLTF(
    "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/chair-wood/model.gltf"
  );
  return <primitive castShadow receiveShadow object={scene} {...props} />;
}
