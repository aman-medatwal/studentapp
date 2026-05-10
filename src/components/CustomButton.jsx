import React from "react";
import { Button } from "@mui/material";

export default function CustomButton({children , ...rest}){
     return(
          <Button variant={rest.variant || "contained"} size="medium" {...rest}>
               {children}
          </Button>
     )
}