## The Empire State Building

### Background
![]({{site.baseurl}}/images/sdhauhduiahusi.jpeg)
<br>In the center of New York City, there is a famous skyscraper called the Empire State Building. It is a magnificent 1,454 feet tall and was finished in 1931. It was the tallest structure when it was first finished, and it kept that title for almost 40 years! It's still among the tallest structures in the country today.

### Architecture  
![]({{site.baseurl}}/images/empireArchi.jpeg)

Art Deco, a design style popular in the 1930s, was used to construct the Empire State Building. It has setbacks in its peculiar stepped-back design, giving it a flat top, on the 86th, 77th, and 63rd floors. The 102-story building is clad in limestone and aluminum. Eagles, sunbursts, and geometric patterns are among the decorative highlights on the building that are all uniquely Art Deco in style. The lobby stands out in especially with its marble walls, brass elevator doors, and stunning artwork. 

One of the Empire State Building's most well-known features is its observatories, which are located on the 86th and 102nd floors, respectively. From these observatories, visitors may take in breathtaking panoramic views of the city. The building is also famous because of it's unique lights that can be changed for different occasions

### Events
![]({{site.baseurl}}/images/nye-2022-with-views-of-empire-state-building-new-york-30-west-30th-street.jpeg)

- The building's debut on May 1, 1931. President Herbert Hoover was there for the occasion, and he gave the facility its official opening by radio address from the White House. 

- The Empire State Building has appeared on many television programmes. Additionally, the structure has served as the backdrop for a number of photo sessions and music videos.

- Numerous special occasions, such as weddings and business gatherings, have been held at the observatories on the 86th and 102nd floors. The observatories are a popular option for such occasions because of the views they provide. 

- The structure has also served as a venue for a number of charitable activities, such as the yearly Empire State Building Run-Up, which raises money for a number of charities. 

- The structure has also played host to a number of political demonstrations, including a march for immigrant rights in 2006 and a protest against the Iraq War in 2003.

### Random facts
<button onclick="getFact()">Get a Fact</button>
<button onclick="getAllFacts()">Get all Facts</button>
<br>
<br>
<textarea id="factBox" rows="4" cols="50"></textarea>

<script>
  function getFact() {
    const facts = [
      "The Empire State Building is 1,454 feet tall.",
      "The Empire State Building has 103 floors.",
      "The Empire State Building was completed in 1931.",
      "The Empire State Building was the tallest building in the world until 1970.",
      "The Empire State Building has its own ZIP code: 10118.",
      "The Empire State Building has an observatory on the 86th floor, which offers panoramic views of the city.",
      "The Empire State Building is lit up at night with different colored lights to celebrate holidays and special events.",
      "The Empire State Building was designed in the Art Deco style, which was popular in the 1920s and 1930s.",
      "The Empire State Building is made of steel and concrete and has 6,514 windows."
    ];

    // Get a random fact
    const fact = facts[Math.floor(Math.random() * facts.length)];

    // Update the text box with the fact
    document.getElementById("factBox").value = fact;
  }

  function getAllFacts() {
    const facts = [
      "The Empire State Building is 1,454 feet tall.",
      "The Empire State Building has 103 floors.",
      "The Empire State Building was completed in 1931.",
      "The Empire State Building was the tallest building in the world until 1970.",
      "The Empire State Building has its own ZIP code: 10118.",
      "The Empire State Building has an observatory on the 86th floor, which offers panoramic views of the city.",
      "The Empire State Building is lit up at night with different colored lights to celebrate holidays and special events.",
      "The Empire State Building was designed in the Art Deco style, which was popular in the 1920s and 1930s.",
      "The Empire State Building is made of steel and concrete and has 6,514 windows."
    ];

    // Join all the facts into a single string
    const allFacts = facts.join("\n");

    // Update the text box with all the facts
    document.getElementById("factBox").value = allFacts;
  }
</script>


### Conclusion

One of New York City's most recognizable landmarks and symbols, the Empire State Building is a global icon. When it was finished in 1931, it was the highest structure in the world, and it held that title for nearly 40 years. It continues to be among the tallest structures in the country. 

Millions of tourists from all around the world have visited the Empire State Building, which is a well-known tourist destination. Visitors to New York must visit its observatories, which are located on the 86th and 102nd floors and provide panoramic views of the city. The lights on the structure are another well-liked element; the colors are altered to coincide with different occasions and holidays. 

The Empire State Building is a massive architectural achievement in addition to being an important tourist destination. It was made in the 1930s and is a well-known illustration of the Art Deco design movement. It was made possible to create such a tall skyscraper because to the building's ground-breaking steel frame and sophisticated elevator technology. 

Overall, the Empire State Building is a treasured monument and popular tourist destination because it has played a significant role in New York City's history and culture.

<head><link href='https://fonts.googleapis.com/css?family=Oxygen' rel='stylesheet'></head>
<style>
    body {
        font-family: Oxygen, sans-serif;
    }

    h1, h2, h3, h4, h5, h6 {
        color: aqua;
    }

    p, span, div {
        color: white;
    }

    img {
        border: 2px solid aqua;
    }
</style>