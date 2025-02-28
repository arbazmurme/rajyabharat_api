const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const adminSchema = new mongoose.Schema(
    {
        adminName: {
            type: String,
            required: [true, "Please enter a name"],
            trim: true,
            minlength: [3, "Admin name must be at least 3 characters long"],
        },
        email: {
            type: String,
            required: [true, "Please provide an email"],
            unique: true,
            trim: true,
            lowercase: true,
            match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"],
        },
        password: {
            type: String,
            required: [true, "Please provide a password"],
            trim: true,
            minlength: [6, "Password must be at least 6 characters long"],
            select: false, // Prevent password from being returned in queries
        },
        mobile: {
            type: String,
            required: [true, "Please provide a mobile number"],
            unique: true,
            trim: true,
            match: [/^\+?[1-9]\d{1,14}$/, "Please provide a valid mobile number"],
        },
        avatar: {
            type: String,
            default:
                "https://res.cloudinary.com/dh1fsseho/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1669977353/Avatar/avatar2_z6yynb.jpg",
        },
        role: {
            type: String,
            enum: ["admin"],
            default: "admin",
            immutable: true,
        },
        resetPasswordToken: String,
        resetPasswordExpire: Date,
    },
    { timestamps: true }
);


adminSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

adminSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};


module.exports = mongoose.model("Admin", adminSchema);
