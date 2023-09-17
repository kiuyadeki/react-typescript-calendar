import {
  Drawer, DrawerContent, DrawerOverlay, DrawerBody, Button,
} from '@chakra-ui/react';
import { FC, memo } from 'react';

type Props = {
  onClose: () => void; // 引数なし、返却値なしの関数
  isOpen: boolean;
  onClickHome: () => void;
  onClickUserManagement: () => void;
  onClickSetting: () => void;
};

export const MenuDrawer: FC<Props> = memo((props) => {
  const {
    onClose, isOpen, onClickHome, onClickUserManagement, onClickSetting,
  } = props;
  return (
    <Drawer placement="left" size="xs" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay p={0} bg="gray.100">
        <DrawerContent>
          <DrawerBody>
            <Button
              w="100%"
              onClick={() => {
                onClickHome();
                onClose();
              }}
            >
              TOP
            </Button>
            <Button
              w="100%"
              onClick={() => {
                onClickUserManagement();
                onClose();
              }}
            >
              ユーザ一覧
            </Button>
            <Button
              w="100%"
              onClick={() => {
                onClickSetting();
                onClose();
              }}
            >
              設定
            </Button>
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
});
