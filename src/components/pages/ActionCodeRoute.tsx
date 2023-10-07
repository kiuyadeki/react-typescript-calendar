import { memo, FC, useEffect, useState } from "react";
import { Box, Heading, Text, Divider, Stack, Flex, Link as ChakraLink } from "@chakra-ui/react";
import { Link as ReactRouterLink, useLocation } from "react-router-dom";
import { applyActionCode } from "firebase/auth";
import { auth } from "../../firebase";
import { FormFrame } from '../parts/FormFrame';
import { EmailVerified } from './EmailVerified';
import { SetNewPassword } from './SetNewPassword';

export const ActionCodeRoute: FC = memo(() => {
  const location = useLocation();
  const [currentMode, setCurrentMode] = useState<string | null>(null);
  const mode = getParameterByName("mode", location.search);
  const actionCode = getParameterByName("oobCode", location.search);

  function getParameterByName(name: string, search: string) {
    const params = new URLSearchParams(search);
    return params.get(name);
  }

  function handleVerifyEmail(auth: any, actionCode: string) {
    applyActionCode(auth, actionCode)
      .then(resp => {
        console.log("your email has verified");
      })
      .catch(error => {
        console.error("Code is invalid or expired :", error);
      });
  }

  useEffect(() => {
    
    setCurrentMode(mode);
    console.log(mode);
    if (actionCode) {
      switch (mode) {
        case "resetPassword":
          break;
        case "recoverEmail":
          break;
        case "verifyEmail":
          handleVerifyEmail(auth, actionCode);
          break;
        default:
      }
    }
  }, []);

  return (
    <FormFrame>
      {currentMode === "verifyEmail" && <EmailVerified />}
      {currentMode === "resetPassword" && <SetNewPassword actionCode={actionCode} />}
    </FormFrame>
  );
});
