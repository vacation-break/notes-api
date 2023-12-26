syllabus = Map({
    2021: Map({
        11: ["CSE1101", "CSE1107", "MATH1107"],
        12: [] //...
    })
    //....
})

subjectwise = [ // main search done here
    {
        course: "CSE1101",
        teachers: Map({
            2021: Map({ //for faster searching,
                "NHS": ['rignerpijg'],
                "SD": [] //...
            })
        })
    },
    //...
]
users = [
    {
        id: 2107071,
        batch: 2021,
        currentTerm: 21, //autoupdates
    }
    //...
]
bulk_data =//stores all submissions
    [
        {
            _id: 'rignerpijg',
            type: 0,//book , actually enum 1 for slide, 2 for 
            provided_by: 2107071,//user id
            links: ["",] //links for download
        },
        {},
        {}
    ]