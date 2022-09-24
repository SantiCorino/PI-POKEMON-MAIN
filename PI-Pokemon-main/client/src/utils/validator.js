const validateURL = (url) => {
    return /^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
};
  
const validateName = (name) => {
    return /^[a-zA-ZñÑ]+$/.test(name);
};
  
const validateNum = (value) => {
    return /^[1-9][0-9]?$|^150$/.test(value);
};
  
export const validateFields = (input, pokemons) => {
    let errors = {};
    if (!input.name || input.name.length < 1) {
        errors.name = "El nuevo Pokémon debe tener un nombre.";
    } else if (!validateName(input.name)) {
        errors.name = "El nombre solo debe contener letras.";
    } else if (pokemons.find((p) => p.name.toLowerCase() === input.name.toLowerCase())) {
        errors.name = "Ya existe un Pokémon con ese nombre.";
    }   else if (input.image.length > 0 && !validateURL(input.image)) {
        errors.image = "Ingresa una URL de imágen válida. Formatos admitidos: jpg, jpeg, png, webp, avif, gif, svg.";
    } else if (!validateNum(input.hp)) {
        errors.hp = "Los HP deben ser un número entero entre 1 y 150";
    } else if (!validateNum(input.attack)) {
        errors.attack = "El ataque debe ser un número entero entre 1 y 150";
    } else if (!validateNum(input.defense)) {
        errors.defense = "La defensa debe ser un número entero entre 1 y 150";
    } else if (!validateNum(input.speed)) {
        errors.speed = "La velocidad debe ser un número entero entre 1 y 150";
    } else if (!validateNum(input.height)) {
        errors.height = "La altura debe ser un número entero entre 1 y 150";
    } else if (!validateNum(input.weight)) {
        errors.weight = "El peso debe ser un número entero entre 1 y 150";
    }
    return errors;
};

export const validateSelection = (input) => {
    let errorSelection = {};
    if (input.type.length > 3) {
      errorSelection.types = "El Pokémon puede tener hasta 3 tipos";
    }
    return errorSelection;
  };