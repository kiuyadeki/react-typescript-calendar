import { Box, Button, FormControl, FormErrorMessage, FormLabel, HStack, Image, Input, Radio, RadioGroup, Select, Stack } from "@chakra-ui/react";
import { ChangeEvent, FC, memo, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useProfilePictureUpload } from '../../hooks/useProfilePictureChange';
import { useRecoilState } from 'recoil';
import { wholeNodesState } from '../../recoil/WholeNodesState';
import { Node } from 'reactflow';
import { PersonNodeData } from '../../types/PersonNodeData';

type Inputs = {
  lastName: string;
  firstName: string;
  birthYear: number;
  birthMonth: number;
  birthDate: number;
  gender: string;
  profilePicture: any;
};

type ProfileEditorProps = {
  selectedNode: PersonNodeData | null;
  setShowProfileEditor: (value: boolean) => void;
  onClose: () => void;
}

export const ProfileEditor: FC<ProfileEditorProps> = memo(props => {
  const { selectedNode, setShowProfileEditor, onClose } = props;
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
      const updatedNode = {
        ...selectedNode,
        data: {
          ...selectedNode.data,
          lastName: data.lastName,
          firstName: data.firstName,
          birthYear: data.birthYear,
          birthMonth: data.birthMonth,
          birthDate: data.birthDate,
          gender: data.gender,
          profilePicture: data.profilePicture,
        }
      }

      setWholeNodes(prevNodes => prevNodes.map(node => {
        return node.id === selectedNode.id ? updatedNode : node;
      }));
    }
    onClose();
    setShowProfileEditor(false);
  });

  const [selectedGender, setSelectedGender] = useState<string | undefined>(undefined);
  interface Gender {
    label: string;
    value: string;
  }
  const genders: Gender[] = [
    {
      label: '男性',
      value: 'male',
    },
    {
      label: '女性',
      value: 'female',
    },
  ];

  return (
    <form onSubmit={onSubmit}>
      <HStack>
        <FormControl>
          <FormLabel htmlFor="lastName">姓</FormLabel>
          <Input
            id="lastName"
            placeholder="姓"
            {...register("lastName")}
          />
          <FormErrorMessage>{errors.lastName && errors.lastName.message}</FormErrorMessage>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="firstName">名</FormLabel>
          <Input id="firstName" placeholder="名" {...register("firstName")} />
          <FormErrorMessage>{errors.firstName && errors.firstName.message}</FormErrorMessage>
        </FormControl>
      </HStack>
      <FormLabel mt={6}>性別</FormLabel>
      <HStack>
        <RadioGroup onChange={setSelectedGender} value={selectedGender}>
          <Stack direction='row'>
            <Radio value='male' {...register("gender")}>男性</Radio>
            <Radio value='female' {...register("gender")}>女性</Radio>
          </Stack>
        </RadioGroup>
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
        保存する
      </Button>
    </form>
  );
});
