const Movies = require("./../models/movieModel");
const {catchAsync, successMessage } = require("./../utils/utils");
const AppError = require("./../utils/appError");

exports.getMovies = catchAsync(async (req, res, next) => {
    const movies = await Movies.find();
    successMessage(res, "Movies fetched successfully", 200, { movies });
});

exports.createMovie = catchAsync(async (req, res, next) => {
    const movie = await Movies.create({
        name: req.body.name,
        img: req.body.img,
        summary: req.body.summary
    });
    successMessage(res, "Movies created successfully", 201, { movie });
});

exports.getMovie = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const movie = await Movies.findById(id);

    if (!movie) {
        return next(new AppError("Movie not found", 404));
    }
    successMessage(res, "Movie fetched successfully", 200, { movie });
});

exports.updateMovie = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const movie = await Movies.findByIdAndUpdate(id, req.body, { new:true, runValidators:true });

    if (!movie) return next(new AppError("Movie not found", 404));
    successMessage(res, "Movies updated successfully", 200, { movie });
});

exports.deleteMovie = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const movie = await Movies.findByIdAndDelete(id);

    if (!movie) return next(new AppError("Movie not found", 404));
    successMessage(res, "Movies deleted successfully", 202);
});