const typeOfNotification = async (req, res, next) => {
    if (req.body.object) {
        //  const changes=req.body.entry[0].changes[0]
        if (
            req.body.entry &&
            req.body.entry[0].changes &&
            req.body.entry[0].changes[0] &&
            req.body.entry[0].changes[0].value.messages &&
            req.body.entry[0].changes[0].value.messages[0]
        ) {
            req.type = req.body.entry[0].changes[0].value.messages[0].type
            next()
        }
        else { req.type = "mas" }
    }
}

export { typeOfNotification };