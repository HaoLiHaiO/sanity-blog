import sanityClient from "@sanity/client"

export default sanityClient({
    projectId: "egicsc64",
    dataset: "production",
    useCdn: true,
})