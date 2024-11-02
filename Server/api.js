const express = require('express');
const router = express.Router();
const Car = require('./cars');
router.get('/cars', (req, res) => {
  Car.find({}).then((car) => {
    res.send(car);
  });
});
router.post('/cars', (req, res) => {
  const { name, category, engines, gearboxes, completeSet } = req.body;
  Car.findOne({ name: name, category: category })
    .then((existingCar) => {
      if (existingCar) {
        return res.status(400).send({ error: 'Автомобіль з такими значеннями вже існує.' });
      }
      return Car.create(req.body);
    })
    .then((car) => {
      res.send(car);
    })
    .catch((error) => {
      res.status(500).send({ error: 'Сталася помилка при додаванні автомобіля.' });
    });
});
router.get('/cars/:name', (req, res) => {
  Car.find({ name: req.params.name })
    .then((cars) => {
      if (cars.length === 0) {
        return res.status(404).send({ message: 'No cars found with that name' });
      }
      res.send(cars);
    })
    .catch((error) => {
      res.status(500).send({ message: 'Error retrieving cars', error });
    });
});
router.get('/cars/:name/engines', (req, res) => {
  Car.find({ name: req.params.name }).then((cars) => {
    res.send(cars.getEngines());
  });
});
router.put('/cars/:id', (req, res) => {
  Car.findByIdAndUpdate({ _id: req.params.id }, req.body).then(() => {
    Car.find({ _id: req.params.id }).then((car) => {
      res.send(car);
    });
  });
});
router.delete('/cars/:name', (req, res) => {
  Car.deleteMany({ name: req.params.name })
    .then((result) => {
      if (result.deletedCount === 0) {
        return res.status(404).send({ message: 'Автомобіль з такою назвою не знайдено' });
      }
      res.send({ message: 'Автомобіль успішно видалено', result });
    })
    .catch((error) => {
      res.status(500).send({ message: 'Сталася помилка при видаленні автомобіля', error });
    });
});
router.patch('/cars/:name/add-engine', (req, res) => {
  const { engine } = req.body;

  Car.findOne({ name: req.params.name })
    .then((car) => {
      if (!car) {
        return res.status(404).send({ message: 'Автомобіль з такою назвою не знайдено' });
      }
      return car.addEngine(engine);
    })
    .then((updatedCar) => {
      res.send({ message: 'Двигун успішно додано', updatedCar });
    })
    .catch((error) => {
      res.status(500).send({ message: 'Сталася помилка при додаванні двигуна', error });
    });
});
router.patch('/cars/:name/add-box', (req, res) => {
  const { box } = req.body;

  Car.findOne({ name: req.params.name })
    .then((car) => {
      if (!car) {
        return res.status(404).send({ message: 'Автомобіль з такою назвою не знайдено' });
      }
      return car.addBox(box);
    })
    .then((updatedCar) => {
      res.send({ message: 'Коробку успішно додано', updatedCar });
    })
    .catch((error) => {
      res.status(500).send({ message: 'Сталася помилка при додаванні коробки', error });
    });
});
router.patch('/cars/:name/add-color', (req, res) => {
  const { color } = req.body;

  Car.findOne({ name: req.params.name })
    .then((car) => {
      if (!car) {
        return res.status(404).send({ message: 'Автомобіль з такою назвою не знайдено' });
      }
      return car.addColor(color);
    })
    .then((updatedCar) => {
      res.send({ message: 'Колір успішно додано', updatedCar });
    })
    .catch((error) => {
      res.status(500).send({ message: 'Сталася помилка при додаванні Кольору', error });
    });
});
router.patch('/cars/:name/add-comp', (req, res) => {
  const { comp } = req.body;
  Car.findOne({ name: req.params.name })
    .then((car) => {
      if (!car) {
        return res.status(404).send({ message: 'Автомобіль з такою назвою не знайдено' });
      }
      return car.addComp(comp);
    })
    .then((updatedCar) => {
      res.send({ message: 'Комплектацію успішно додано', updatedCar });
    })
    .catch((error) => {
      res.status(500).send({ message: 'Сталася помилка при додаванні Комплектації', error });
    });
});
router.patch('/cars/:name/remove-engine', (req, res) => {
  const { engine } = req.body;

  Car.findOne({ name: req.params.name })
    .then((car) => {
      if (!car) {
        return res.status(404).send({ message: 'Автомобіль з такою назвою не знайдено' });
      }
      return car.dellEngine(engine);
    })
    .then((updatedCar) => {
      res.send({ message: 'Двигун успішно видалено', updatedCar });
    })
    .catch((error) => {
      if (error.message === 'Cannot delete the only engine.') {
        res.status(400).send({ message: 'Не можна видалити останній двигун.' });
      } else {
        res.status(500).send({ message: 'Сталася помилка при видаленні двигуна', error });
      }
    });
});
router.patch('/cars/:name/remove-box', (req, res) => {
  const { box } = req.body;

  Car.findOne({ name: req.params.name })
    .then((car) => {
      if (!car) {
        return res.status(404).send({ message: 'Автомобіль з такою назвою не знайдено' });
      }
      return car.dellBox(box);
    })
    .then((updatedCar) => {
      res.send({ message: 'Коробку успішно видалено', updatedCar });
    })
    .catch((error) => {
      if (error.message === 'Cannot delete the only box.') {
        res.status(400).send({ message: 'Не можна видалити останню коробку.' });
      } else {
        res.status(500).send({ message: 'Сталася помилка при видаленні коробки', error });
      }
    });
});
router.patch('/cars/:name/addphoto', (req, res) => {
  const { image } = req.body;

  Car.findOne({ name: req.params.name })
    .then((car) => {
      if (!car) {
        return res.status(404).send({ message: 'Автомобіль з такою назвою не знайдено' });
      }
      return car.setPhoto(image);
    })
    .then((updatedCar) => {
      res.send({ message: 'Фотографію успішно додано', updatedCar });
    })
    .catch((error) => {
      res.status(500).send({ message: 'Сталася помилка при додаванні фотографії', error });
    });
});

router.patch('/cars/:name/remove-box', (req, res) => {
  const { box } = req.body;

  Car.findOne({ name: req.params.name })
    .then((car) => {
      if (!car) {
        return res.status(404).send({ message: 'Автомобіль з такою назвою не знайдено' });
      }
      return car.dellEngine(engine);
    })
    .then((updatedCar) => {
      res.send({ message: 'Двигун успішно видалено', updatedCar });
    })
    .catch((error) => {
      res.status(500).send({ message: 'Сталася помилка при видаленні двигуна', error });
    });
});
router.patch('/cars/:name/remove-color', (req, res) => {
  const { color } = req.body;
  Car.findOne({ name: req.params.name })
    .then((car) => {
      if (!car) {
        return res.status(404).send({ message: 'Автомобіль з такою назвою не знайдено' });
      }
      return car.dellColor(color);
    })
    .then((updatedCar) => {
      res.send({ message: 'Колір успішно видалено', updatedCar });
    })
    .catch((error) => {
      res.status(500).send({ message: 'Сталася помилка при видаленні коліру', error });
    });
});
router.patch('/cars/:name/remove-comp', (req, res) => {
  const { comp } = req.body;
  Car.findOne({ name: req.params.name })
    .then((car) => {
      if (!car) {
        return res.status(404).send({ message: 'Автомобіль з такою назвою не знайдено' });
      }
      return car.dellComp(comp);
    })
    .then((updatedCar) => {
      res.send({ message: 'Комплектацію успішно видалено', updatedCar });
    })
    .catch((error) => {
      res.status(500).send({ message: 'Сталася помилка при видаленні комплектації', error });
    });
});
module.exports = router;
