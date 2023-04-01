declare module "*.md";
declare module "*.txt" {
    const value: string;
    export default value;
}