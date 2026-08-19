import mongoose from "mongoose";
import { connect, disconnect } from "./connect.js";

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
}, { timestamps: true });

const blogSchema = new mongoose.Schema({
  title: String,
  subtitle: String,
  tags: [String],
  content: String,
  coverImage: String,
  active: { type: Boolean, default: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });

const technologySchema = new mongoose.Schema({
  name: { type: String, unique: true },
  technologies: [
    {
      name: String,
      icon: String,
      active: { type: Boolean, default: true },
    },
  ],
  tags: [String],
  active: { type: Boolean, default: true },
});

const jobSchema = new mongoose.Schema({
  companyName: String,
  position: String,
  active: { type: Boolean, default: true },
  socialLinks: [
    {
      icon: String,
      url: String,
      name: String,
    },
  ],
}, { timestamps: true });

const mainSectionSchema = new mongoose.Schema({
  title: String,
  name: String,
  rol: String,
  description: String,
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
const Blog = mongoose.model("Blog", blogSchema);
const Technology = mongoose.model("Technology", technologySchema);
const Job = mongoose.model("Job", jobSchema);
const MainSection = mongoose.model("MainSection", mainSectionSchema);

const seed = async () => {
  await connect();

  await User.deleteMany({});
  await Blog.deleteMany({});
  await Technology.deleteMany({});
  await Job.deleteMany({});
  await MainSection.deleteMany({});
  console.log("Colecciones limpiadas");

  const user = await User.create({
    username: "admin",
    email: "admin@froggap.com",
    password: "admin123",
  });
  console.log("Usuario creado:", user.username);

  await MainSection.create({
    title: "Bienvenido",
    name: "Froggap",
    rol: "Developer",
    description: "Desarrollador Full Stack apasionado por crear experiencias web increíbles.",
  });
  console.log("MainSection creada");

  await Technology.create({
    name: "Frontend",
    technologies: [
      { name: "React", icon: "react", active: true },
      { name: "Vue.js", icon: "vue", active: true },
      { name: "TypeScript", icon: "typescript", active: true },
    ],
    tags: ["frontend", "ui"],
    active: true,
  });
  console.log("Technology creada");

  await Job.create({
    companyName: "Froggap",
    position: "Full Stack Developer",
    active: true,
    socialLinks: [
      { icon: "linkedin", url: "https://linkedin.com", name: "LinkedIn" },
      { icon: "github", url: "https://github.com", name: "GitHub" },
    ],
  });
  console.log("Job creado");

  await Blog.create({
    title: "Primer Post",
    subtitle: "Introducción al CMS",
    tags: ["cms", "intro"],
    content: "Este es el primer post del CMS Froggap.",
    active: true,
    userId: user._id,
  });
  console.log("Blog creado");

  console.log("Seed completado");
  await disconnect();
};

seed().catch(console.error);
