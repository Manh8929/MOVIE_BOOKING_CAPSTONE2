import { User, Role } from "../models";


//user 
export const getAllUsersService = async () => {
  const users = await User.findAll({
    include: {
      model: Role,
      attributes: ["role_name", "description"],
    },
    attributes: {
      exclude: ["password"], // không trả password
    },
    order: [["createdAt", "DESC"]],
  });

  return {
    message: "Fetched all users successfully",
    users,
  };
};

export const deleteUserService = async (id) => {
  const user = await User.findByPk(id);
  if (!user) {
    throw { message: "User not found", statusCode: 404 };
  }

  await user.destroy();

  return {
    message: "User deleted successfully",
    user_id: id,
  };
};

export const updateUserService = async (id, newData) => {
  const user = await User.findByPk(id);
  if (!user) {
    throw { message: "User not found", statusCode: 404 };
  }

  // Không cho phép cập nhật email
  if ("email" in newData) {
    delete newData.email;
  }

  await user.update(newData);

  return {
    message: "User updated successfully",
    user,
  };
};


