exports.postGame = async(req, res, next)=>{
    const content = req.body.content;
    // if the response is positive and created
    res.status(201).json({ 
        message: 'se realizo un post exitosamente',
        post: {content: content} 
    });
};

exports.getGames = async(req, res, next)=>{
    // if the response is positive
    res.status(200).json({ data });
};