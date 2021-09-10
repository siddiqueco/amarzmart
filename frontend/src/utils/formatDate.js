export const formatDate = (date) => {
   return new Date(date).toLocaleDateString('en-US', {
       weekday: 'short',
       year: 'numeric',
       month: 'short',
       day: 'numeric',
       hour: 'numeric',
       minute: 'numeric',
       second: 'numeric'
   })

}