import React from "react";
import { Card , CardContent , Typography } from "@mui/material";

export default function PageCard({title,children}){
     return(
          <Card sx={{p:1 , mb : 2}}>
               {title && <Typography variant="h6" sx={{px: 2 , pt:1}}>{title}</Typography>} 
               <CardContent>{children}</CardContent>
          </Card>
     );
}    