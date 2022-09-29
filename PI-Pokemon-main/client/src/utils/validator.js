const validateURL = (url) => {
    return /^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
};
  
const validateName = (name) => {
    return /^[a-zA-ZñÑ]+$/.test(name);
};
  
const validateNum = (value) => {
    return /^\d+$/.test(value);
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
        errors.image = "Ingresa una URL de imágen válida.";
    } else if (!validateNum(input.hp) || parseInt(input.hp)<1 || parseInt(input.hp)>160) {
        errors.hp = "Los HP deben ser un número entero entre 1 y 160";
    } else if (!validateNum(input.attack) || parseInt(input.attack)<1 || parseInt(input.attack)>110) {
        errors.attack = "El ataque debe ser un número entero entre 1 y 110";
    } else if (!validateNum(input.defense) || parseInt(input.defense)<1 || parseInt(input.defense)>100) {
        errors.defense = "La defensa debe ser un número entero entre 1 y 100";
    } else if (!validateNum(input.speed) || parseInt(input.speed)<1 || parseInt(input.speed)>130) {
        errors.speed = "La velocidad debe ser un número entero entre 1 y 130";
    } else if (!validateNum(input.height) || parseInt(input.height)<1 || parseInt(input.height)>50) {
        errors.height = "La altura debe ser un número entero entre 1 y 50";
    } else if (!validateNum(input.weight) || parseInt(input.weight)<1 || parseInt(input.weight)>4600) {
        errors.weight = "El peso debe ser un número entero entre 1 y 4600";
    } else if (input.types.length < 1 || input.types.length > 2) {
        errors.types = "El Pokémon debe tener al menos un tipo";
    }
    return errors;
};

// export const validateSelection = (input) => {
//     let errorSelection = {};
//     if (input.types.length > 3 || input.types.length===0) {
//       errorSelection.types = "El Pokémon debe tener entre 1 y 2 tipos";
//     }
//     return errorSelection;
//   };