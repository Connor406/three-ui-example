// Prevents TypeScript from freaking out when importing .glsl files

declare module '*.glsl' {
  const value: string
  export default value
}
