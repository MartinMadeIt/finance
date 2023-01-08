import styled from "@emotion/styled";
import { Autocomplete, TextField } from "@mui/material";


const textFieldsConstant = (color:string) => `
* {
    color: ${color};
  }
  
  border-bottom: 1px solid ${color};
  border-radius: 0px;
  height: 60px;
  width: 100%;
  color: ${color};
  
  label {
    color: ${color};
  }
  
  input {
    color: ${color};
    width: 100%;
  }
  
  fieldset {
    box-sizing: border-box;
    width:  100%;
    height: 60px;
    border: none;
    padding: 10px 14px;
  }
`

export const LightTextField = styled(TextField)`
${textFieldsConstant('#bdbdbd')}
`;

export const DarkTextField = styled(TextField)`
${textFieldsConstant('#252525')}
`;

export const LightAutocomplete = styled(Autocomplete)`
${textFieldsConstant('#bdbdbd')}
`;

export const DarkAutocomplete = styled(Autocomplete)`
${textFieldsConstant('#252525')}
`;

