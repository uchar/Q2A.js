import {
  isSelf,
  isSuperAdmin,
  isAdmin,
  isAuthenticated,
  isPublic,
  isAuthenticatedAndEmailConfirmed,
} from '../../gql/permissions';
import { ROLE, TABLES } from '../../constants';
import { createData, questionData } from '../../testUtility';

describe('permissions tests', () => {
  const testAuthorizationFunction = async (functionToCall, role, args, fieldName, resultToBe) => {
    const user = global.test_user;
    const context = role
      ? {
          user: { id: user.id, publicName: 'q2a_admin', role, iat: 1618572953, exp: 1619177753 },
        }
      : { user: null };
    const info = {
      fieldName,
    };
    const result = await functionToCall.func(null, args, context, info);
    expect(result).toBe(resultToBe);
  };

  test('if isSelf work', async () => {
    const q = await createData(TABLES.POST_TABLE, questionData, true);
    await testAuthorizationFunction(
      isSelf,
      ROLE.USER_CONFIRMED,
      {
        id: q.id, // random question id
      },
      'updateQuestion',
      true
    );
    await testAuthorizationFunction(
      isSelf,
      ROLE.USER_CONFIRMED,
      {
        id: 100, // random question id
      },
      'updateQuestion',
      false
    );
    const user = global.test_user;

    await testAuthorizationFunction(
      isSelf,
      ROLE.USER_CONFIRMED,
      {
        id: user.id,
      },
      'updateUser',
      true
    );
    await testAuthorizationFunction(
      isSelf,
      ROLE.USER_CONFIRMED,
      {
        id: 100, // some random id
      },
      'updateUser',
      false
    );
  });

  test('if isSuperAdmin work', async () => {
    await testAuthorizationFunction(isSuperAdmin, ROLE.SUPER_ADMIN, {}, '..', true);
    await testAuthorizationFunction(isSuperAdmin, ROLE.ADMIN, {}, '..', false);
  });
  test('if admin work', async () => {
    await testAuthorizationFunction(isAdmin, ROLE.USER_NOT_CONFIRMED, {}, '..', false);
    await testAuthorizationFunction(isAdmin, ROLE.ADMIN, {}, '..', true);
  });
  test('if isAuthenticated work', async () => {
    await testAuthorizationFunction(isAuthenticated, ROLE.SUPER_ADMIN, {}, '..', true);
    await testAuthorizationFunction(isAuthenticated, ROLE.ADMIN, {}, '..', true);
    await testAuthorizationFunction(isAuthenticated, ROLE.USER_CONFIRMED, {}, '..', true);
    await testAuthorizationFunction(isAuthenticated, ROLE.USER_NOT_CONFIRMED, {}, '..', true);
    await testAuthorizationFunction(isAuthenticated, null, {}, '..', false);
  });
  test('if isAuthenticatedAndEmailConfirmed work', async () => {
    await testAuthorizationFunction(isAuthenticatedAndEmailConfirmed, ROLE.SUPER_ADMIN, {}, '..', false);
    await testAuthorizationFunction(isAuthenticatedAndEmailConfirmed, ROLE.ADMIN, {}, '..', false);
    await testAuthorizationFunction(
      isAuthenticatedAndEmailConfirmed,
      ROLE.USER_NOT_CONFIRMED,
      {},
      '..',
      false
    );
    await testAuthorizationFunction(isAuthenticatedAndEmailConfirmed, ROLE.USER_CONFIRMED, {}, '..', true);
    await testAuthorizationFunction(isAuthenticatedAndEmailConfirmed, null, {}, '..', false);
  });
  test('if isPublic work', async () => {
    await testAuthorizationFunction(isPublic, null, {}, '..', true);
    await testAuthorizationFunction(isPublic, ROLE.USER_CONFIRMED, {}, '..', true);
    await testAuthorizationFunction(isPublic, ROLE.USER_NOT_CONFIRMED, {}, '..', true);
    await testAuthorizationFunction(isPublic, ROLE.ADMIN, {}, '..', true);
    await testAuthorizationFunction(isPublic, ROLE.SUPER_ADMIN, {}, '..', true);
  });
});
