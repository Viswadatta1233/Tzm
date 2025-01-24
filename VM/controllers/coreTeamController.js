const CoreTeam = require('../models/CoreTeam');
const { upload } = require('../config/cloudinary');

// Create a new core team member
exports.createCoreTeam = async (req, res) => {
    try {
        upload.single('image')(req, res, async (err) => {
            if (err) {
                return res.status(400).json({ message: 'Error uploading image', error: err });
            }

            const { name, position } = req.body;
            const image = req.file?.path; // Get Cloudinary URL from Multer

            if (!name || !position || !image) {
                return res.status(400).json({ message: 'Name, position, and image are required' });
            }

            const coreTeamMember = new CoreTeam({
                name,
                image,
                position,
            });

            await coreTeamMember.save();

            res.status(201).json({ message: 'Core team member created successfully', coreTeamMember });
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get all core team members
exports.getCoreTeam = async (req, res) => {
    try {
        const coreTeamMembers = await CoreTeam.find();
        res.status(200).json(coreTeamMembers);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Update core team member
exports.updateCoreTeam = async (req, res) => {
    try {
        upload.single('image')(req, res, async (err) => {
            if (err) {
                return res.status(400).json({ message: 'Error uploading image', error: err });
            }

            const updateData = { ...req.body };
            if (req.file) {
                updateData.image = req.file.path; // Update the image URL from Cloudinary
            }

            const coreTeamMember = await CoreTeam.findByIdAndUpdate(req.params.id, updateData, { new: true });

            if (!coreTeamMember) {
                return res.status(404).json({ message: 'Core team member not found' });
            }

            res.status(200).json(coreTeamMember);
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Delete core team member
exports.deleteCoreTeam = async (req, res) => {
    try {
        await CoreTeam.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Core team member deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};