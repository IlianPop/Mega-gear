const express = require('express');
const router = express.Router();
const Car = require('./cars');
router.get('/cars', (req, res) => {
  Car.find({})
    .then((car) => res.send(car))
    .catch((error) => res.status(500).send({ message: 'Помилка отримання автомобілів', error }));
});
router.post('/cars', (req, res) => {
  const { name, category, engines, gearboxes, completeSet } = req.body;
  Car.findOne({ name, category })
    .then((existingCar) => {
      if (existingCar) {
        return res.status(400).send({ error: 'Автомобіль з такими значеннями вже існує.' });
      }
      return Car.create(req.body);
    })
    .then((car) => res.send(car))
    .catch((error) => res.status(500).send({ error: 'Сталася помилка при додаванні автомобіля.' }));
});
router.get('/cars/:name', (req, res) => {
  Car.find({ name: req.params.name })
    .then((cars) => {
      if (cars.length === 0) {
        return res.status(404).send({ message: 'Автомобілів з такою назвою не знайдено' });
      }
      res.send(cars);
    })
    .catch((error) => res.status(500).send({ message: 'Помилка отримання автомобілів', error }));
});
router.get('/cars/:name/engines', (req, res) => {
  Car.findOne({ name: req.params.name })
    .then((car) => {
      if (!car) {
        return res.status(404).send({ message: 'Автомобіль не знайдено' });
      }
      res.send(car.getEngines());
    })
    .catch((error) => res.status(500).send({ message: 'Помилка отримання двигунів', error }));
});
router.put('/cars/:id', (req, res) => {
  Car.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((car) => res.send(car))
    .catch((error) => res.status(500).send({ message: 'Помилка оновлення автомобіля', error }));
});
router.delete('/cars/:name', (req, res) => {
  Car.deleteMany({ name: req.params.name })
    .then((result) => {
      if (result.deletedCount === 0) {
        return res.status(404).send({ message: 'Автомобіль з такою назвою не знайдено' });
      }
      res.send({ message: 'Автомобіль успішно видалено', result });
    })
    .catch((error) => res.status(500).send({ message: 'Помилка видалення автомобіля', error }));
});
router.patch('/cars/:name/add-engine', (req, res) => {
  const { engine } = req.body;
  Car.findOne({ name: req.params.name })
    .then((car) => {
      if (!car) {
        return res.status(404).send({ message: 'Автомобіль не знайдено' });
      }
      return car.addEngine(engine);
    })
    .then((updatedCar) => res.send({ message: 'Двигун успішно додано', updatedCar }))
    .catch((error) => res.status(500).send({ message: 'Помилка додавання двигуна', error }));
});
router.patch('/cars/:name/add-box', (req, res) => {
  const { box } = req.body;
  Car.findOne({ name: req.params.name })
    .then((car) => {
      if (!car) {
        return res.status(404).send({ message: 'Автомобіль не знайдено' });
      }
      return car.addBox(box);
    })
    .then((updatedCar) => res.send({ message: 'Коробку успішно додано', updatedCar }))
    .catch((error) => res.status(500).send({ message: 'Помилка додавання коробки', error }));
});
router.patch('/cars/:name/add-color', (req, res) => {
  const { color } = req.body;
  Car.findOne({ name: req.params.name })
    .then((car) => {
      if (!car) {
        return res.status(404).send({ message: 'Автомобіль не знайдено' });
      }
      return car.addColor(color);
    })
    .then((updatedCar) => res.send({ message: 'Колір успішно додано', updatedCar }))
    .catch((error) => res.status(500).send({ message: 'Помилка додавання кольору', error }));
});
router.patch('/cars/:name/add-comp', (req, res) => {
  const { comp } = req.body;
  Car.findOne({ name: req.params.name })
    .then((car) => {
      if (!car) {
        return res.status(404).send({ message: 'Автомобіль не знайдено' });
      }
      return car.addComp(comp);
    })
    .then((updatedCar) => res.send({ message: 'Комплектацію успішно додано', updatedCar }))
    .catch((error) => res.status(500).send({ message: 'Помилка додавання комплектації', error }));
});
router.patch('/cars/:name/remove-engine', (req, res) => {
  const { engine } = req.body;
  Car.findOne({ name: req.params.name })
    .then((car) => {
      if (!car) {
        return res.status(404).send({ message: 'Автомобіль не знайдено' });
      }
      return car.dellEngine(engine);
    })
    .then((updatedCar) => res.send({ message: 'Двигун успішно видалено', updatedCar }))
    .catch((error) => {
      const errMsg =
        error.message === 'Cannot delete the only engine.'
          ? 'Не можна видалити останній двигун.'
          : 'Помилка видалення двигуна';
      res.status(500).send({ message: errMsg, error });
    });
});
router.patch('/cars/:name/remove-color', (req, res) => {
  const { color } = req.body;
  Car.findOne({ name: req.params.name })
    .then((car) => {
      if (!car) {
        return res.status(404).send({ message: 'Автомобіль не знайдено' });
      }
      return car.dellColor(color);
    })
    .then((updatedCar) => res.send({ message: 'Колір успішно видалено', updatedCar }))
    .catch((error) => res.status(500).send({ message: 'Помилка видалення кольору', error }));
});
router.patch('/cars/:name/remove-comp', (req, res) => {
  const { comp } = req.body;
  Car.findOne({ name: req.params.name })
    .then((car) => {
      if (!car) {
        return res.status(404).send({ message: 'Автомобіль не знайдено' });
      }
      return car.dellComp(comp);
    })
    .then((updatedCar) => res.send({ message: 'Комплектацію успішно видалено', updatedCar }))
    .catch((error) => res.status(500).send({ message: 'Помилка видалення комплектації', error }));
});
router.patch('/cars/:name/addphoto', (req, res) => {
  const { image } = req.body;
  Car.findOne({ name: req.params.name })
    .then((car) => {
      if (!car) {
        return res.status(404).send({ message: 'Автомобіль не знайдено' });
      }
      return car.setPhoto(image);
    })
    .then((updatedCar) => res.send({ message: 'Фотографію успішно додано', updatedCar }))
    .catch((error) => res.status(500).send({ message: 'Помилка додавання фотографії', error }));
});

module.exports = router;
