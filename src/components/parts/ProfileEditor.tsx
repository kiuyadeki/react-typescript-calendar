import { Box, Button, FormControl, FormErrorMessage, FormLabel, HStack, Image, Input, Select } from "@chakra-ui/react";
import { FC, memo, useRef } from "react";
import { useForm } from "react-hook-form";
import { useProfilePictureUpload } from '../../hooks/useProfilePictureChange';
import { useRecoilState } from 'recoil';
import { wholeNodesState } from '../../recoil/WholeNodesState';
import { Node } from 'reactflow';

type Inputs = {
  lastName: string;
  firstName: string;
  birthYear: number;
  birthMonth: number;
  birthDate: number;
  profilePicture: any;
};

type ProfileEditorProps = {
  selectedNode: Node | null;
  setShowProfileEditor: (value: boolean) => void;
}

export const ProfileEditor: FC<ProfileEditorProps> = memo(props => {
  const { selectedNode, setShowProfileEditor } = props;
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1900 + 1 }, (_, i) => 1900 + i);
  const months = Array.from( {length: 12}, (_, i) => i + 1);
  const dates = Array.from( {length: 31}, (_, i) => i + 1);
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<Inputs>();
  const { uploadedImage, handleImageChange } = useProfilePictureUpload();
  const [wholeNodes, setWholeNodes] = useRecoilState(wholeNodesState);

  // ファイルが選択されたときにreact-hook-formの値を更新
  const onFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleImageChange(event);
    const file = event.target.files ? event.target.files[0] : null;
    setValue('profilePicture', file);
  };

  const handleButtonClick = () => {
    document.getElementById('profilePictureInput')?.click();
  };


  const onSubmit = handleSubmit(data => {
    if (selectedNode) {
      const nodeIdToUpdate = selectedNode.id;

      const updatedNodes = wholeNodes.map(node => {
        if (node.id === nodeIdToUpdate) {
          return {
            ...node,
            data: {
              ...node.data,
              lastName: data.lastName,
              firstName: data.firstName,
              birthYear: data.birthYear,
              birthMonth: data.birthMonth,
              birthDate: data.birthDate,
              profilePicture: data.profilePicture,
            }
          }
        }
        return node;
      });

      console.log('updated:', updatedNodes);
    }
    console.log(data);
    setShowProfileEditor(false);
  });

  return (
    <form onSubmit={onSubmit}>
      <HStack>
        <FormControl isInvalid={!!errors.lastName}>
          <FormLabel htmlFor="lastName">姓</FormLabel>
          <Input
            id="lastName"
            placeholder="姓"
            {...register("lastName", {
              required: "必須項目です",
            })}
          />
          <FormErrorMessage>{errors.lastName && errors.lastName.message}</FormErrorMessage>
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="firstName">名</FormLabel>
          <Input id="firstName" placeholder="名" {...register("firstName")} />
          <FormErrorMessage>{errors.firstName && errors.firstName.message}</FormErrorMessage>
        </FormControl>
      </HStack>
      <FormLabel mt={6}>生年月日</FormLabel>
      <HStack>
        <FormControl>
          <Select placeholder="年" {...register("birthYear")}>
            {years.map(year => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <Select placeholder="月" {...register("birthMonth")}>
            {months.map(month => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <Select placeholder="日" {...register("birthDate")}>
            {dates.map(date => (
              <option key={date} value={date}>
                {date}
              </option>
            ))}
          </Select>
        </FormControl>
      </HStack>
      <FormControl>
        <FormLabel mt={6}>写真</FormLabel>
        <Input
          id='profilePictureInput'
          type='file'
          accept='image/*'
          {...register('profilePicture', {
            onChange: onFileInputChange
          })}
          hidden
        />
        <Button onClick={handleButtonClick}>Upload File</Button>
        {uploadedImage && (
          <Box>
            <Image src={uploadedImage} />
          </Box>
        )}
      </FormControl>

      <Button mt={4} isLoading={isSubmitting} type="submit">
        submit
      </Button>
    </form>
  );
});
