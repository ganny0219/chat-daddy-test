import dayjs from "dayjs";

export const defaultBoardData = {
  notStarted: [
    {
      id: "1",
      title: "Take coco to a vet",
      due: dayjs("8/20/2025").toDate(),
      subTasks: [],
    },
    {
      id: "5",
      title: "Take coco to a vet 2",
      subTasks: [],
    },
  ],
  inProgress: [
    {
      id: "2",
      title: "Taxes",
      subTasks: [
        {
          done: false,
          text: "Accountant contract",
        },
        {
          done: false,
          text: "Request work payslips",
        },
        {
          done: false,
          text: "Cancel VAT ID",
        },
      ],
    },
  ],
  blocked: [
    {
      id: "3",
      title: "Move",
      subTasks: [
        {
          done: false,
          text: "Request moving estimate",
        },
        {
          done: true,
          text: "Order Moving",
        },
      ],
    },
  ],
  done: [
    {
      id: "4",
      title: "Nothing to be done",
      subTasks: [],
    },
  ],
};
