const { Observable } = require("rxjs");
const { map } = require("rxjs/operators");

const users = {
    data: [{
            status: "active",
            age: 14,
        },

        {
            status: "inactive",
            age: 11,
        },

        {
            status: "active",
            age: 31,
        },

        {
            status: "active",
            age: 42,
        },

        {
            status: "inactive",
            age: 23,
        },
        {
            status: "active",
            age: 51,
        },

        {
            status: "inactive",
            age: 39,
        },

        {
            status: "inactive",
            age: 18,
        },
    ],
};

const observable = new Observable((subscriber) => {
    subscriber.next(users);
}).pipe(
    map((value) => {
        console.log("first operator", value);
        return value.data;
    }),
    map((value) => {
        console.log("got data from second operator", value);
        return value.filter((user) => user.status === "active");
    }),
    map((value) => {
        console.log("got data from third operator", value);
        return value.reduce((sum, user) => sum + user.age, 0) / value.length;
    })
);

const observer = {
    // take care of the data
    next: (value) => {
        console.log("Observer got a value of " + value);
    },
    // hanle error
    error: (err) => {
        console.log("error:" + err);
    },
    //reject data because it's full
    complete: () => {
        console.log("Observer got complete notification");
    },
};

observable.subscribe(observer); //create connection between observable and observer