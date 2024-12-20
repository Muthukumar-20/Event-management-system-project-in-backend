import Post from "../Models/postModel.js";

export const createPost = async (req, res) => {
  try {
    const { title, description, date, time, generalprice, vipprice, location } =
      req.body;
    let imageUrl = "";
    if (req.file && req.file.path) {
      imageUrl = req.file.path;
      console.log(imageUrl);
    }

    const newPost = new Post({
      title,
      description,
      generalprice,
      vipprice,
      date,
      time,
      location,
      image: imageUrl,
      user: req.user._id,
    });

    await newPost.save();
    res

      .status(200)
      .json({ message: "Post Created Successfully", data: newPost });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//approve the post

export const approvePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { approved: true },
      { new: true }
    );
    res.status(200).json({ message: "Post Approved Successfully", data: post });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//delete the post
export const deletePost = async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Post Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPost = async (req, res) => {
  try {
    const posts = await Post.find({ approved: true }).populate("user", "name");
    res.status(200).json({ message: "Posts Fetched Successfully", posts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// unapproved post
export const getUnapprovedPost = async (req, res) => {
  try {
    const posts = await Post.find({ approved: false }).populate("user", "name");
    res.status(200).json({ message: "Posts Fetched Successfully", posts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
