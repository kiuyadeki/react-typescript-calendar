import { Box, Button, FormControl, FormErrorMessage, FormLabel, HStack, Image, Input, Select, Spacer } from "@chakra-ui/react";
import { FC, memo } from "react";
import { useForm } from "react-hook-form";
import { useProfilePictureUpload } from '../../hooks/useProfilePictureChange';

type Inputs = {
  lastName: string;
  firstName: string;
  profilePicture: string;
};

export const ProfileEditor: FC = memo(props => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1900 + 1 }, (_, i) => 1900 + i);
  const months = Array.from( {length: 12}, (_, i) => i + 1);
  const dates = Array.from( {length: 31}, (_, i) => i + 1);
  const { uploadedImage, handleImageChange } = useProfilePictureUpload();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>();

  const onSubmit = handleSubmit(values => {
    return new Promise<void>(resolve => {
      setTimeout(() => {
        console.log(JSON.stringify(values, null, 2));
        resolve();
      }, 3000);
    });
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
          ></Input>
          <FormErrorMessage>{errors.lastName && errors.lastName.message}</FormErrorMessage>
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="firstName">名</FormLabel>
          <Input id="firstName" placeholder="名" {...register("firstName")}></Input>
          <FormErrorMessage>{errors.firstName && errors.firstName.message}</FormErrorMessage>
        </FormControl>
      </HStack>
      <FormLabel mt={6}>生年月日</FormLabel>
      <HStack>
        <FormControl>
          <Select placeholder="年">
            {years.map(year => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <Select placeholder="月">
            {months.map(month => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <Select placeholder="日">
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
        <Input type='file' accept='image/*' {...register('profilePicture')} onChange={handleImageChange}></Input>
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
