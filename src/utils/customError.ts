class CustomError extends Error {
    code: any;
    constructor(message:any, code:any) {
      super(message);
      this.code = code;
    }
  }
  
  export { CustomError };