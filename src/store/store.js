import { reactive } from 'vue'

export const store = reactive({
    urlApi: 'http://127.0.0.1:8000/api/',

    howToHireTitle:[
        {
            title:"HOW TO HIRE IN VILLAIN",
            intro:"Hiring a villain from our roster is easy and straightforward. Follow these steps:",
        },
    ],
    howToHireInfo :[
        {
            icon: "fa-solid fa-explosion",
            title: 'Explore our selection:',
            info: 'Browse the villain profiles and read their descriptions, skills, and reviews to find the one that best fits your needs.',
        },
        {
            icon: "fa-brands fa-searchengin",
            title: 'Use the search filter:',
            info: 'Refine your search based on the specific skills you\'re looking for, such as sabotage, henchman recruitment, or world domination planning.',
        },
        {
            icon: "fa-solid fa-file-signature",
            title: 'Contact the chosen villain: ',
            info: 'Once you\'ve found your ideal antagonist, click the contact button and fill out the request form, specifying the details of your mission or adventure.',
        },
        {
            icon: "fa-solid fa-coins",
            title: 'Negotiate the terms: ',
            info: 'After sending your request, the villain will respond with a quote or proposal. You can discuss terms, services, and costs, making sure everything is perfectly planned.',
        },
        {
            icon: "fa-solid fa-play",
            title: 'Begin the adventure: ',
            info: 'Once the agreement is reached, your villain will get to work. Get ready for an adventure full of chaos and plot twists!',
        },
    ],
});