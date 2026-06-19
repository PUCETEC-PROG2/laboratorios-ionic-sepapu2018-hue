export interface Repository {
  id: number;
  name: string;
  description: string;
  language: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

export const repositoryList: Repository[] = [
  {
    id: 1,
    name: "react-dashboard",
    description:
      "Un panel de control de administración moderno construido con React y Tailwind.",
    language: "TypeScript",
    owner: {
      login: "usuario",
      avatar_url:
        "https://avatars.githubusercontent.com/u/48026030?v=4"
    }
  },
  {
    id: 2,
    name: "fastapi-backend",
    description:
      "API REST de alto rendimiento para el manejo de usuarios y autenticación.",
    language: "Python",
    owner: {
      login: "usuario",
      avatar_url:
        "https://avatars.githubusercontent.com/u/48026030?v=4"
    }
  },
  {
    id: 3,
    name: "awesome-utils",
    description:
      "Colección de funciones utilitarias para el día a día en JavaScript vanilla.",
    language: "JavaScript",
    owner: {
      login: "usuario",
      avatar_url:
        "https://avatars.githubusercontent.com/u/48026030?v=4"
    }
  },
  {
    id: 4,
    name: "flutter-ecommerce",
    description:
      "Aplicación móvil de comercio electrónico con soporte para iOS y Android.",
    language: "Dart",
    owner: {
      login: "usuario",
      avatar_url:
        "https://avatars.githubusercontent.com/u/48026030?v=4"
    }
  },
  {
    id: 5,
    name: "rust-game-engine",
    description:
      "Un motor de videojuegos 2D enfocado en el rendimiento y la seguridad de memoria.",
    language: "Rust",
    owner: {
      login: "usuario",
      avatar_url:
        "https://avatars.githubusercontent.com/u/16384"
    }
  }
];