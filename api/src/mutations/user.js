import * as yup from 'yup';
import databaseUtils from '../db/database.js';
import { LANGUAGE, TABLES, THEME } from '../constants.js';
import { createSuccessResponse, checkInputValidation } from '../utility.js';

const updateUser = async (_, { id, input }) => {
  const SUPPORTED_FORMATS = ['jpg', 'jpeg', 'png', 'bmp', 'gif', 'svg'];
  const updateUserSchema = await yup.object().shape({
    profileImage: yup.mixed().test('Image type', 'Your image type is wrong .', (value) => {
      if (value) {
        try {
          const type = value.split('.').pop().toLowerCase();
          return SUPPORTED_FORMATS.includes(type);
        } catch (e) {
          return false;
        }
      }
      return true;
    }),
    about: yup.string(),
    theme: yup.mixed().oneOf([THEME.LIGHT, THEME.DARK]),
    language: yup.mixed().oneOf([LANGUAGE.PERSIAN, LANGUAGE.ENGLISH]),
  });

  const validationResult = await checkInputValidation(updateUserSchema, {
    profileImage: input.profileImage,
    about: input.about,
    theme: input.theme,
    language: input.language,
  });
  if (validationResult !== true) {
    return validationResult;
  }

  const User = await databaseUtils().loadModel(TABLES.USER_TABLE);
  await User.update(input, {
    where: { id },
  });
  return createSuccessResponse();
};

export { updateUser };
