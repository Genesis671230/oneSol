
import {createClient} from "next-sanity"
import imageUrlBuilder from '@sanity/image-url'


export const config = {
  projectId: 'z3vlpzz7',
  dataset: 'production',
  apiVersion: '2022-03-10',
  useCdn: false,
  token:'skDDS8IgeUEauYVYu8jiXgJsSmYGpO8ArbIjqJ3tTGh34cQ7y4KpajA7a0M71kCrP8LepgsnpTRiL4HD9uKpFj0KWM4AefNZbIHlAo5ASAnWwThYf2AYkx7DMQ6ng4exYtyZHmP94xPRwBUs55zbEgqqDptyS85OvG6aWrUQsZNNG4rVd8CR'
};

export const client_Sanity = createClient(config)




export const urlFor = (source) =>  imageUrlBuilder(client_Sanity).image(source)

// export const  userCurrentUser = createCurrentUserHook(client_Sanity)