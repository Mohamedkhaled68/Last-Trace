const AppError = require("../utils/AppError");
const asyncHandler = require("../utils/asyncHandler");
const crypto = require("crypto");

// Simple in-memory storage for tokens (in production, use Redis or similar)
const activeTokens = new Set();

// Dummy users (in production, use a database)
const users = [{ username: "admin", password: "admin123" }];

// Utility function to hash password
const hashPassword = (password) => {
    return crypto.createHash("sha256").update(password).digest("hex");
};

exports.register = asyncHandler(async (req, res, next) => {
    const { username, email, password } = req.body;

    // Comprehensive validation
    if (!username || !email || !password) {
        return next(new AppError("الرجاء إدخال جميع البيانات المطلوبة", 400));
    }

    // Validate email domain
    const emailRegex = /^[^@]+@mans\.edu\.eg$/;
    if (!emailRegex.test(email)) {
        return next(
            new AppError(
                "يجب أن يكون البريد الإلكتروني من نطاق mans.edu.eg",
                400
            )
        );
    }

    // Validate username format
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    if (!usernameRegex.test(username)) {
        return next(
            new AppError(
                "اسم المستخدم يجب أن يكون بين 3-20 حرف أو رقم أو underscore",
                400
            )
        );
    }

    // Check if username already exists
    const existingUsername = users.find((u) => u.username === username);
    if (existingUsername) {
        return next(new AppError("اسم المستخدم موجود بالفعل", 409));
    }

    // Check if email already exists
    const existingEmail = users.find((u) => u.email === email);
    if (existingEmail) {
        return next(new AppError("البريد الإلكتروني مستخدم بالفعل", 409));
    }

    // Enhanced password validation
    const passwordRegex = /^\d{6}$/;
    if (!passwordRegex.test(password)) {
        return next(
            new AppError("كلمة المرور يجب أن تكون مكونة من 6 أرقام فقط", 400)
        );
    }

    // Create new user
    const newUser = {
        id: users.length + 1,
        username,
        email,
        password: hashPassword(password), // Hash the password
        createdAt: new Date(),
    };

    // Add user to the users array
    users.push(newUser);

    // Generate a secure token
    const token = crypto.randomBytes(32).toString("hex");
    activeTokens.add(token);

    res.status(201).json({
        message: "تم إنشاء الحساب بنجاح",
        token,
        user: {
            username: newUser.username,
            email: newUser.email,
        },
    });
});
exports.login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    // Check if email and password exist
    if (!email || !password) {
        return next(
            new AppError("الرجاء إدخال البريد الإلكتروني وكلمة المرور", 400)
        );
    }

    // Validate email format
    const emailRegex = /^[^@]+@mans\.edu\.eg$/;
    if (!emailRegex.test(email)) {
        return next(
            new AppError(
                "يجب أن يكون البريد الإلكتروني من نطاق mans.edu.eg",
                400
            )
        );
    }

    // Hash the provided password for comparison
    const hashedPassword = hashPassword(password);

    const user = users.find(
        (u) => u.email === email && u.password === hashedPassword
    );

    if (!user) {
        return next(
            new AppError("البريد الإلكتروني أو كلمة المرور غير صحيحة", 401)
        );
    }

    // Generate a secure token
    const token = crypto.randomBytes(32).toString("hex");
    activeTokens.add(token);

    res.json({
        message: "تم تسجيل الدخول بنجاح",
        token,
        user: {
            username: user.username,
            email: user.email,
        },
    });
});
exports.logout = asyncHandler(async (req, res) => {
    const token = req.headers["authorization"];
    activeTokens.delete(token);
    res.json({ message: "تم تسجيل الخروج بنجاح" });
});

exports.protect = asyncHandler(async (req, res, next) => {
    const token = req.headers["authorization"];

    if (!token) {
        return next(
            new AppError("الرجاء تسجيل الدخول للوصول إلى هذا المحتوى", 401)
        );
    }

    if (!activeTokens.has(token)) {
        return next(new AppError("غير مصرح بالدخول", 401));
    }

    next();
});

// Export activeTokens for testing purposes
exports.activeTokens = activeTokens;
