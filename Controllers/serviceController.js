import Service from "../Models/serviceModel.js";

//new user creating

export const creatService = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const service = new Service({ name, description, price });
    await service.save();
    res
      .status(200)
      .json({ message: "Create service successfully", date: service });
  } catch (error) {
    res.status(500).json({ message:error.message });
  }
};

//get user
export const getService = async (req, res) => {
  try {
    const services = await Service.find();
    res
      .status(200)
      .json({ message: "Service Retrieved Successfully", data: services });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// update the service
export const updateService = async (req, res) => {
  try {
    const serviceId = req.params.id;
    const { name, description, price } = req.body;
    const result = await Service.findByIdAndUpdate(
      { _id: serviceId },
      { name, description, price },
      { new: true }
    );
    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Service Not Found" });
    }
    res.status(200).json({ message: "Service Updated", data: result });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// delete the service

export const deleteService = async (req, res) => {
  try {
    const serviceId = req.params.id;
    const result = await Service.findByIdAndDelete({ _id: serviceId });
    if (!result) {
      return res.status(404).json({ message: "Service Not Found" });
    }
    const service = await Service.find();
    res.status(200).json({ message: "Service deleted", data: service });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
