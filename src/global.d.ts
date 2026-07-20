//Avoid error during import of glsl files
declare module '*.glsl' {
  const value: string;
  export default value;
}