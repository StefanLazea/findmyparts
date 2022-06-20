const PartsService = require("./services/part");
const CarsService = require("./services/car");

const bindWebSocket = (socket) => {
  socket.on("parts", () => {});
  socket.on("savePart", async (part) => {
    console.log("am primit ", part);
    const partsList = JSON.parse(
      JSON.stringify(await PartsService.findQuery())
    );
    console.log(partsList);
    socket.emit("partsListUpdate", partsList);
  });
  socket.on("deletePart", async (partId) => {
    console.log("am sters piesa", partId);
    const partsList = JSON.parse(
      JSON.stringify(await PartsService.findQuery())
    );
    socket.emit("partsListUpdate", partsList);
  });
  socket.on("updatePart", async (partId, userId = "") => {
    console.log("am updatat piesa ", partId);
    console.log("user id-ul", userId);
    const partsList = JSON.parse(
      JSON.stringify(await PartsService.findQuery(userId))
    );
    console.log(partsList);
    socket.emit("refreshProfilePage", partsList);
  });

  //cars
  socket.on("saveCar", async (car) => {
    console.log("am primit ", car);
    const carsList = JSON.parse(
      JSON.stringify(await CarsService.findCarsByUserId())
    );
    socket.emit("carsListUpdate", carsList);
  });
  socket.on("updateCar", async (carId) => {
    console.log("am primit ", carId);
    const updatedCar = JSON.parse(
      JSON.stringify(await CarsService.findCarById(carId))
    );
    socket.emit("carUpdated", updatedCar);
  });
  socket.on("deleteCar", async (carId) => {
    console.log("am primit ", carId);
    const carsList = JSON.parse(JSON.stringify(await CarsService.findAll()));
    socket.emit("carsListUpdate", carsList);
  });
};
module.exports = {
  bindWebSocket,
};
