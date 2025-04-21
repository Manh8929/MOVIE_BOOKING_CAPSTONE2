import { createShowtime, updateShowtime, deleteShowtime } from "../services/showtimeService.js";
import userService from '../services/userService';

export const getAllUsers = (req, res) => {
  res.status(200).json({ message: "Admin can view all users" });
};

export const getUserProfile = (req, res) => {
  res.status(200).json({ message: "User can view their profile" });
};

// API Add lịch chiếu
export const createShowtimeController = async (req, res, next) => {
  try {
    const result = await createShowtime(req.body);
    res.status(201).json({
      message: "Tạo lịch chiếu thành công",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// API Update lịch chiếu
export const updateShowtimeController = async (req, res, next) => {
  try {
    const result = await updateShowtime(req.params.id, req.body);
    res.status(200).json({
      message: "Cập nhật lịch chiếu thành công",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// API Delete lịch chiếu
export const deleteShowtimeController = async (req, res, next) => {
  try {
    await deleteShowtime(req.params.id);
    res.status(200).json({
      message: "Xoá lịch chiếu thành công",
    });
  } catch (error) {
    next(error);
  }
};

//News
// Add news
export const createNews = async (req, res) => {
  const { movie_id, title, content, image_url } = req.body;
  try {
    const newNews = await userService.createNews({ movie_id, title, content, image_url });
    res.status(201).json(newNews);
  } catch (error) {
    console.error('Error creating news:', error);
    res.status(500).json({ message: 'Error creating news' });
  }
};

// Update news by ID
export const updateNews = async (req, res) => {
  const { id } = req.params;
  const { title, content, image_url } = req.body;
  try {
    const updatedNews = await userService.updateNews(id, { title, content, image_url });
    if (!updatedNews) {
      return res.status(404).json({ message: 'News not found' });
    }
    res.status(200).json(updatedNews);
  } catch (error) {
    console.error('Error updating news:', error);
    res.status(500).json({ message: 'Error updating news' });
  }
};


// Del news by ID
export const deleteNews = async (req, res) => { 
  const { id } = req.params;
  try {
    const deletedNews = await userService.deleteNews(id);
    if (!deletedNews) {
      return res.status(404).json({ message: 'News not found' });
    }
    res.status(200).json({ message: 'News deleted successfully' });
  } catch (error) {
    console.error('Error deleting news:', error);
    res.status(500).json({ message: 'Error deleting news' });
  }
};
