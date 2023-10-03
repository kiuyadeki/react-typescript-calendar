import { memo, FC, useEffect, useState } from "react";
import { Box, Heading, Text, Divider, Stack, Flex, Link as ChakraLink } from "@chakra-ui/react";
import { Link as ReactRouterLink, useLocation } from "react-router-dom";
import { applyActionCode } from "firebase/auth";
import { auth } from "../../firebase";
import { FormFrame } from '../parts/FormFrame';
import { EmailVerified } from './EmailVerified';

export const ActionCodeRoute: FC = memo(() => {
  const location = useLocation();
  const [currentMode, setCurrentMode] = useState<string | null>(null);

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
    const mode = getParameterByName("mode", location.search);
    const actionCode = getParameterByName("oobCode", location.search);
    setCurrentMode(mode);
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
      {currentMode === "verifiedEmail" && <EmailVerified />}
    </FormFrame>
  );
});
