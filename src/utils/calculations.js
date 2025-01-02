export const calculateOrbitPosition = (angle, radius) => {
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    return { x, z };
  };
  
  export const getZIndex = (z, isSun = false) => {
    if (isSun) return 2;
    return z < 0 ? 1 : 3;
  };