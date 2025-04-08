import db from "../models";
exports.getUserProfile = async (userId) => {
  try {
    const user = await db.User.findByPk(userId);

    if (!user) {
      return null;
    }

    // Lấy thông tin role của người dùng
    const role = await db.Role.findByPk(user.role_id);

    return {
      user_id: user.user_id,
      full_name: user.full_name,
      email: user.email,
      role_id: user.role_id,
      role_name: role ? role.role_name : "No role",
      provider: user.provider,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      avatar: user.avatar,
      phone_number: user.phone_number,
      address: user.address,
      dob: user.dob,
      gender: user.gender,
    };
  } catch (err) {
    console.error(err);
    throw new Error("Error fetching user profile");
  }
};
