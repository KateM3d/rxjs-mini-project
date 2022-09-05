const { Observable } = require("rxjs");
const { map } = require("rxjs/operators");

const users = {
    data: [{
            status: "active",
            age: 10,
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
            age: 12,
        },

        {
            status: "inactive",
            age: 23,
        },
        {
            status: "active",
            age: 10,
        },

        {
            status: "inactive",
            age: 19,
        },

        {
            status: "inactive",
            age: 18,
        },
    ],
};
const usersTwo = {
    data: [{
            status: "active",
            age: 20,
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
            age: 12,
        },

        {
            status: "inactive",
            age: 23,
        },
        {
            status: "active",
            age: 10,
        },

        {
            status: "inactive",
            age: 19,
        },

        {
            status: "inactive",
            age: 18,
        },
    ],
};

const observable = new Observable((subscriber) => {
    subscriber.next(usersTwo);
    subscriber.complete();
    subscriber.next(users);
}).pipe(
    map((value) => {
        // console.log("first operator", value);
        return value.data;
    }),
    map((value) => {
        // console.log("got data from second operator", value);
        return value.filter((user) => user.status === "active");
    }),
    map((value) => {
        // console.log("got data from third operator", value);
        return value.reduce((sum, user) => sum + user.age, 0) / value.length;
    }),
    map((value) => {
        // console.log("got data from forth operator", value);
        if (value < 18) throw new Error("Average age is too young ");
        else return value;
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