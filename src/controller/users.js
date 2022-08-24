

getUsers = (req, res) => {
    try{
        res.status(200).json(mockUsers)
    }catch(e){
        res.status(400).json({message: "Something went wrong while trying to get users"});
    }
};

getUserById = (req, res) => {
    try{
        const userId = parseInt(req.params.id);
        if(!userId) throw new Error();

        const user = mockUsers.find((user) => user.id === userId);
        res.status(200).json(user)
    }catch(e){
        res.status(400).json({message: "Something went wrong while trying to get users"});
    }
}

module.exports = {
    getUsers,
    getUserById
}