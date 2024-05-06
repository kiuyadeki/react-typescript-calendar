import { Box, Button, FormErrorMessage, Image, Input, Radio, RadioGroup, Select, Stack } from "@chakra-ui/react";
import { ChangeEvent, FC, memo, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useProfilePictureUpload } from "../../hooks/useProfilePictureChange";
import { useRecoilState, useRecoilValue } from "recoil";
import { wholeNodesState } from "../../recoil/WholeNodesState";
import { nodesUpdatedState } from "../../recoil/nodesUpdatedState";
import { selectedNodeState } from "../../recoil/selectedNodeState";
import styled from "styled-components";

type Inputs = {
  lastName: string;
  firstName: string;
  birthYear: number;
  birthMonth: number;
  birthDate: number;
  gender: string;
  profilePicture: any;
  profilePictureURL: any;
};

type ProfileEditorProps = {
  setShowProfileEditor: (value: boolean) => void;
  onClose: () => void;
};

export const ProfileEditor: FC<ProfileEditorProps> = memo(props => {
  const { setShowProfileEditor, onClose } = props;
  const selectedNode = useRecoilValue(selectedNodeState);
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1900 + 1 }, (_, i) => 1900 + i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const dates = Array.from({ length: 31 }, (_, i) => i + 1);
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<Inputs>();
  const { uploadedImage, handleImageChange } = useProfilePictureUpload();
  const [wholeNodes, setWholeNodes] = useRecoilState(wholeNodesState);
  const [nodesUpdated, setNodesUpdated] = useRecoilState(nodesUpdatedState);
  const [previewImageURL, setPreviewImageURL] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // ファイルが選択されたときにreact-hook-formの値を更新
  const onFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleImageChange(event);
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      const previewURL = URL.createObjectURL(file);
      setPreviewImageURL(previewURL);
    } else {
      setPreviewImageURL(null);
    }
    setValue("profilePicture", file);
  };

  const handleButtonClick = () => {
    inputRef.current?.click();
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
          profilePictureURL: data.profilePicture instanceof File ? URL.createObjectURL(data.profilePicture) : null,
        },
      };
      setWholeNodes(prevNodes =>
        prevNodes.map(node => {
          return node.id === selectedNode.id ? updatedNode : node;
        })
      );
    }
    onClose();
    setShowProfileEditor(false);
    setNodesUpdated(true);
  });

  const [selectedGender, setSelectedGender] = useState<string | undefined>(undefined);
  interface Gender {
    label: string;
    value: string;
  }
  const genders: Gender[] = [
    {
      label: "男性",
      value: "male",
    },
    {
      label: "女性",
      value: "female",
    },
  ];

  useEffect(() => {
    if (selectedNode && selectedNode.data) {
      const { lastName, firstName, birthYear, birthMonth, birthDate, gender, profilePicture } = selectedNode.data;
      setValue("lastName", lastName || "");
      setValue("firstName", firstName || "");
      setValue("birthYear", birthYear || new Date().getFullYear());
      setValue("birthMonth", birthMonth || 1);
      setValue("birthDate", birthDate || 1);
      setSelectedGender(gender);
      if (profilePicture) {
        setValue("profilePicture", profilePicture || "");
        const previewURL = typeof profilePicture === "string" ? profilePicture : URL.createObjectURL(profilePicture);
        setPreviewImageURL(previewURL);
      }
    }
  }, [selectedNode, setValue]);

  const HorizontalBox = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
  `;

  const FormControl = styled.div`
    width: 100%;
    position: relative;
  `;

  interface FormLabelProps {
    mt?: number;
  }
  const FormLabel = styled.label<FormLabelProps>`
    margin-top: ${props => props.mt || 0}px;
    display: block;
    text-align: start;
    font-size: 1rem;
    margin-inline-end: 0.75rem;
    margin-block-end: 0.5rem;
    font-weight: 500;
    transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow, transform;
    transition-duration: 200ms;
    opacity: 1;
  `;

  return (
    <form onSubmit={onSubmit}>
      <HorizontalBox>
        <FormControl>
          <FormLabel htmlFor="lastName">姓</FormLabel>
          <Input id="lastName" placeholder="姓" {...register("lastName")} />
          <FormErrorMessage>{errors.lastName && errors.lastName.message}</FormErrorMessage>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="firstName">名</FormLabel>
          <Input id="firstName" placeholder="名" {...register("firstName")} />
          <FormErrorMessage>{errors.firstName && errors.firstName.message}</FormErrorMessage>
        </FormControl>
      </HorizontalBox>
      <FormLabel mt={6}>性別</FormLabel>
      <HorizontalBox>
        <RadioGroup onChange={setSelectedGender} value={selectedGender}>
          <HorizontalBox>
            <Radio value="male" {...register("gender")}>
              男性
            </Radio>
            <Radio value="female" {...register("gender")}>
              女性
            </Radio>
          </HorizontalBox>
        </RadioGroup>
      </HorizontalBox>
      <FormLabel mt={6}>生年月日</FormLabel>
      <HorizontalBox>
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
      </HorizontalBox>
      <FormControl>
        <FormLabel mt={6}>写真</FormLabel>
        <Input
          id="profilePictureInput"
          type="file"
          accept="image/*"
          {...register("profilePicture", {
            onChange: onFileInputChange,
          })}
          hidden
          ref={inputRef}
        />
        <Button onClick={handleButtonClick}>Upload File</Button>
        {previewImageURL && <Image src={previewImageURL} />}
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
