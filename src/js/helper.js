export const getJSON = async function(url) {
  try {
    const res = await fetch(url);
    if (!res) throw Error('could\'t fetch movies')
    
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}
