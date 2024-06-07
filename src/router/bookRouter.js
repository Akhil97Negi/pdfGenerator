import { Router } from "express";
import BookModel from "../model/bookModel.js";
import { authmiddleware, rolemiddleware } from "../middleware/authmiddleware.js";



const bookRouter = Router();

//create book

bookRouter.post('/create' , authmiddleware,async(req, res) =>{
    const {title , author, frontCoverImage, backCoverImage, pages} = req.body
    try {
        const newbook = new BookModel({title , author, frontCoverImage, backCoverImage, pages})
        await newbook.save()
        res.status(201).json({book : newbook})
    } catch (error) {
        console.log(error.message)
    }
})

//get all books

bookRouter.get('/', authmiddleware, async(req, res) =>{
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    try{
        const books = await BookModel.find()
        .skip((page -1) * limit)
        .limit(limit);

        res.status(200).json({books : books})

    }
    catch(err){
        console.error('error while fetching books:' , err);
        res.status(500).json({message : "error fetching books "})
    }
})


//get single book by id

bookRouter.get('/:id' , authmiddleware, async (req, res) =>{
    const bookId = req.params.id;
    try {
        const book = await BookModel.findById(bookId)

        if(!book){
            return res.status(404).json({message : "book not found"})
        }
        return res.status(404).json({book : book})
    } catch (error) {
        console.error('Error while fetching book by id :', error);
        res.status(500).json({message : "werror fetching book"})
    }
})

//delete book by id (admin only)

// bookRouter.delete('/:id'   , async(req, res)=>{
//     const bookId = req.params.id;

//     try{
//         const deletebook = await BookModel.findByIdAndDelete(bookId);
//         if(!deletebook){
//             return res.status(404).json({message : "book not found"})
//         }
//         res.status(200).json({message : "book deleted sucessfully"})
//     }
//     catch(err){
//         // console.error('Error whil;e deleting book by id:' , err);
//         res.status(500).json({message : "error deleting book by id"})
//     }
// })

//deletebook

bookRouter.delete('/:id', authmiddleware, rolemiddleware(['admin']),async (req, res) => {
    const bookId = req.params.id;

    try {
        const deletebook = await BookModel.findByIdAndDelete(bookId);
        if (!deletebook) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json({ message: "Book deleted successfully" }); 
    } catch (err) {
        console.error('Error while deleting book by id:', err); 
        res.status(500).json({ message: "Error deleting book by id" }); 
    }
});
export default bookRouter













