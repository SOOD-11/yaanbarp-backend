export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  contentParts: string [];
  video:string,
  author: string;
  date: string;
  readTime: string;
  image?: string[];
  tags: string[];
  category: string;
  audioAvailable?: boolean;
  featured?: boolean;
  authorImage?: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: 'Polali-RajaRajeshwari-Temple',
    title: 'Polali RajaRajeshwari Temple',
    excerpt: '“A sacred shrine dedicated to the fierce yet graceful Goddess Rajarajeshwari, steeped in centuries of devotion.”',
    category:'Temple',
 contentParts : [
      `
      <section class="space-y-4">
        <h2 class="text-3xl font-bold text-[#00555A]">Introduction</h2>
        <p class="text-gray-700 text-lg leading-relaxed">
          <strong>Polali Rajarajeshwari Temple</strong> is located in <strong>Polali, Dakshina Kannada district</strong>, Karnataka.
          The temple’s presiding deity is <strong>Shri Rajarajeshwari</strong>. Originally constructed by <strong>King Suratha</strong>,
          it has since been developed by various dynasties. The temple dates back to the <strong>8th century</strong>,
          with the <strong>clay idol</strong> believed to be even older.
        </p>
      </section>
      `,
    
      `
      <section class="space-y-4">
        <h3 class="text-2xl font-semibold text-[#7A3E3E]">History of Polali Rajarajeshwari</h3>
        <p class="text-gray-700 text-lg leading-relaxed">
          The idol of <strong>Sri Rajarajeshwari</strong>—another form of the divine <strong>Goddess Sri Lalita Tripurasundari</strong>—is
          entirely made from <strong>special medicinal clay</strong>.
          <strong>Chinese Buddhist monk Fa-Hien</strong>, who visited India in the <strong>6th century</strong>,
          wrote about this powerful idol, claiming he hadn’t seen such divine power elsewhere in Hindustan.
          The temple boasts classic <strong>Hindu architecture</strong>, featuring <strong>intricately carved wooden roofs</strong> and <strong>copper plates</strong>.
        </p>
        <p class="text-gray-700 text-lg leading-relaxed">
          The area was known as <em><strong>Pural</strong></em> in ancient times, which means <strong>“Flute”</strong> in the <strong>Tulu language</strong>.
          In <strong>Mugera</strong> language, "Pural" or "Purel" can also imply <strong>“changing sides”</strong>—perhaps referencing how the nearby
          river <strong>sharply turns near the temple</strong>.
        </p>
      </section>
      `,
    
      `
      <section class="space-y-4">
        <h3 class="text-2xl font-semibold text-[#7A3E3E]">Cultural Festival: Chendu</h3>
        <p class="text-gray-700 text-lg leading-relaxed">
          The <strong>Polali Chendu</strong> festival—popularly known as the <em><strong>Football Festival</strong></em>—is a vibrant <strong>five-day event</strong>
          held <strong>seven days before</strong> the temple’s <strong>Avabritha celebration</strong>.
          A <strong>handmade leather ball</strong> is crafted by a <strong>cobbler family in Mijar</strong> and ceremonially delivered by an
          <strong>oil miller family from Kadapu Karia</strong>.
        </p>
        <p class="text-gray-700 text-lg leading-relaxed">
          On the first evening, the <strong>ball and a palm-leaf umbrella</strong> are offered at the <strong>gopuram</strong> of the temple.
          After divine blessings, the ball is taken to the field to commence the game, symbolizing the <strong>eternal battle of good vs. evil</strong>.
        </p>
        <p class="text-gray-700 text-lg leading-relaxed">
          Villages <strong>Ammunje</strong> and <strong>Manel</strong> compete as rivals, with <strong>Bollur</strong> and <strong>Mallur</strong> supporting them.
          Up to <strong>500 participants</strong> may join, making this not just a sport but a <strong>cultural ritual</strong>.
          The concluding <strong>car festival</strong> celebrates the <strong>triumph of good over evil</strong>.
        </p>
      </section>
      `
    ],
    author: 'Jeevan Shetty',
    date: '2024-12-01',
    readTime: '8 min read',
    image: [
   "/blog-images/polaliBlog/44C505A0-0235-481B-BF16-DC6160A1F23B_1_105_c.jpeg"
    ],
    video:"",
    tags: ['Coastal Heritage', 'St. Mary\'s Islands', 'Fishing Culture', 'Temples'],
   
    audioAvailable: true
  },
  {
    id: 'Pilivesha',
    title: 'Pilivesha',
    excerpt: 'A fierce and vibrant folk dance where performers embody tigers to invoke divine power and thrill the crowds.',
    image: ['/blog-images/PiliveshaBlog/DF61DBA2-3A60-43A9-84AC-3BC20A7C392C.jpeg',
   
     ],
 contentParts : [
      `
      <section class="space-y-4">
        <h2 class="text-3xl font-bold text-[#00555A]">Introduction</h2>
        <p class="text-gray-700 text-lg leading-relaxed">
          <strong>Pilivesha</strong>, or <strong>Hulivesha</strong>, is a vibrant <strong>folk dance</strong> tradition from <strong>Tulunadu</strong>,
          celebrated during <strong>religious and festive occasions</strong>. Performers, painted in vivid colors
          and adorned like <strong>tigers</strong>, dance with intense energy to the beats of the <strong>Thase</strong> (a percussion instrument).
          The tradition transcends <strong>age, gender, and religion</strong>, symbolizing <strong>life</strong>, <strong>cultural identity</strong>, and <strong>inclusivity</strong>.
        </p>
        <p class="text-gray-700 text-lg leading-relaxed">
          The name <strong>'Pilivesha'</strong> is derived from the <strong>Tulu language</strong>—<strong>'Pili'</strong> means <em>Tiger</em> and <strong>'Vesha'</strong>
          refers to <em>costume</em> or <em>makeup</em>. Thus, Pilivesha is the <strong>art of impersonating a tiger</strong> through costume and movement.
          However, it is more than impersonation—it's a deeply expressive <strong>dance performance</strong>.
        </p>
      </section>
      `,
    
      `
      <section class="space-y-4">
        <h3 class="text-2xl font-semibold text-[#7A3E3E]">History of Pilivesha</h3>
        <p class="text-gray-700 text-lg leading-relaxed">
          The exact <strong>historical origins</strong> of Pilivesha in <strong>Tulunadu</strong> are unclear, but its roots are tied to the
          <strong>well-being</strong> of the community. It holds <strong>ritualistic significance</strong>, often beginning with a spiritual
          initiation called <strong>Udu Pooje</strong>. Some dancers are believed to become <strong>possessed</strong> by the spirit of the tiger.
        </p>
        <p class="text-gray-700 text-lg leading-relaxed">
          Participants follow strict <strong>ritual purity</strong> norms, refraining from <strong>meat and alcohol</strong>. Scholars suggest
          that Pilivesha may have evolved from agrarian efforts to <strong>coexist with wild tigers</strong>, which once
          posed real threats to livestock and villagers. These tigers, like other <strong>Bhutas</strong> (spirit deities),
          were likely worshipped for <strong>protection</strong>.
        </p>
      </section>
      `,
    
      `
      <section class="space-y-4">
        <h3 class="text-2xl font-semibold text-[#7A3E3E]">Variation in Udupi and Mangalore Style of Pilivesha</h3>
        <p class="text-gray-700 text-lg leading-relaxed">
          Pilivesha has diverged into two prominent styles across Tulunadu:
          <strong>Udupi Style</strong> and <strong>Mangalore Style</strong>.
        </p>
        <ul class="list-disc list-inside text-gray-700 text-lg space-y-1">
          <li><strong>Udupi Style</strong>: Performed during <strong>Krishna Janmashtami</strong> and <strong>Ganesh Chaturthi</strong>. Dancers are adorned with <strong>sheep wool</strong> before painting.</li>
          <li><strong>Mangalore Style</strong>: Featured in <strong>Dasara/Navaratri</strong>. Performers <strong>shave all body hair</strong> before painting.</li>
          <li>Both styles involve <strong>Ram Dhol</strong> and <strong>Thrase instruments</strong> and unique <strong>headgear variations</strong>.</li>
        </ul>
        <p class="text-gray-700 text-lg leading-relaxed">
          While Udupi’s tradition is closely tied to the <strong>Krishna Matha</strong>, Mangalore's version is seen more in
          <strong>Devi temples</strong> during Dasara.
        </p>
      </section>
      `,
    
      `
      <section class="space-y-4">
        <h2 class="text-3xl font-bold text-[#00555A]">Key Features of Pilivesha</h2>
        <ul class="list-disc list-inside text-gray-700 text-lg space-y-1">
          <li><strong>Tiger-themed Performances</strong>: Dancers are painted as <strong>tigers</strong>, often with one portraying a <strong>hunter</strong>.</li>
          <li><strong>Distinctive Dance Steps</strong>: Synchronized with <strong>percussion rhythms</strong>; a defining element of the performance.</li>
          <li><strong>Inclusion of Hunter</strong>: A performer with a toy gun, <strong>paid separately</strong>, adds dramatic flair.</li>
          <li><strong>Musical Accompaniment</strong>: Live music with <strong>traditional percussion instruments</strong>.</li>
          <li><strong>Competitions and Innovation</strong>: New-age troupes include <strong>stunts</strong> and elements from other dance forms.</li>
          <li><strong>Choreographed Performances</strong>: Requires <strong>rigorous practice</strong> and often judged in <strong>formal contests</strong>.</li>
          <li><strong>Local Funding</strong>: Local committees sponsor performances by covering <strong>costumes, paint, travel, and food</strong>.</li>
          <li><strong>Cultural Significance</strong>: Performed during <strong>Navratri</strong> and <strong>Krishna Janmashtami</strong> to honor <strong>Goddess Durga</strong>.</li>
        </ul>
        <p class="text-gray-700 text-lg leading-relaxed">
          Pilivesha is not just a performance—it's a <strong>visceral experience</strong>. To witness its intensity and grace is
          to truly understand the <strong>essence of Tulunadu's culture</strong>.
        </p>
      </section>
      `
    ],
    video:"",
    author: 'Jeevan Shetty',
    date: '2025-1-28',
    readTime: '12 min read',
  
    tags: ['Yakshagana', 'Traditional Arts', 'Cultural Heritage', 'Dance Drama', 'Coastal Karnataka'],
    category: 'Art Forms',
    audioAvailable: true
  },
  {
    id: 'Kambala',
    title: 'Kambala',
    excerpt: "Experience the thunderous energy of Tulunadu’s traditional buffalo race through slushy paddy fields",
  contentParts : [
      `
      <section class="space-y-4">
        <h2 class="text-3xl font-bold text-[#00555A]">Introduction</h2>
        <p class="text-gray-700 text-lg leading-relaxed">
          <strong>Tulunadu</strong> is renowned for its <strong>rich culture and spirituality</strong>, and one of its most iconic traditions is <strong>Kambala</strong>.
          This <strong>mud-track buffalo race</strong> is held annually from <strong>November to March</strong>, where pairs of buffaloes are raced across
          a muddy paddy field.
        </p>
        <p class="text-gray-700 text-lg leading-relaxed">
          The word <strong>Kambala</strong> is believed to be derived from <strong>"Kampa"</strong> (mud) and <strong>"Kala"</strong> (large area), essentially meaning
          a <strong>large muddy agricultural field</strong>. Originating in the <strong>15th century</strong>, Kambala began as a <strong>ritualistic tradition</strong>
          among <strong>feudal agricultural communities</strong> of Tulunadu. It was historically organized by <strong>feudal lords</strong>, particularly
          from the <strong>Bunt</strong> and <strong>Jain</strong> communities.
        </p>
      </section>
      `,
    
      `
      <section class="space-y-4">
        <h3 class="text-2xl font-semibold text-[#7A3E3E]">Categories in Kambala</h3>
        <p class="text-gray-700 text-lg leading-relaxed">
          Kambala races are classified not only by <strong>traditional vs competitive</strong> types, but also by the <strong>gear used</strong> to
          tie the buffaloes. Here are the key categories:
        </p>
        <ul class="list-disc list-inside text-gray-700 text-lg space-y-1">
          <li><strong>Noda Kambala</strong>: A casual, less competitive form of Kambala.</li>
          <li><strong>Negilu Ota (Plough)</strong>: A <strong>light plough</strong> is tied to the buffaloes; the jockey must control the plough while running.</li>
          <li><strong>Hagga Ota (Rope Race)</strong>: Buffaloes are tied with a <strong>rope</strong> and the rider follows behind. Typically used with experienced buffaloes.</li>
          <li><strong>Adda Halage (Wooden Plank)</strong>: The jockey stands on a <strong>wooden plank</strong> dragged by the buffaloes. This is generally for <strong>senior buffaloes</strong>.</li>
          <li><strong>Kene Halage (Slippery Track)</strong>: A variant held on a <strong>particularly slippery mud track</strong>.</li>
        </ul>
      </section>
      `,
    
      `
      <section class="space-y-4">
        <h3 class="text-2xl font-semibold text-[#7A3E3E]">Human Relationship with the Buffaloes</h3>
        <p class="text-gray-700 text-lg leading-relaxed">
          As <strong>Kambala</strong> expanded beyond its traditional months into <strong>March and April</strong>, more attention was paid to <strong>buffalo well-being</strong>,
          including <strong>hydration</strong> and <strong>cooling</strong>. The racing buffaloes—usually <strong>uncastrated males</strong>—can grow aggressive with age,
          especially toward <strong>strangers</strong>. However, they recognize and remain <strong>gentle</strong> with their caretakers.
        </p>
        <p class="text-gray-700 text-lg leading-relaxed">
          Some buffaloes are exceptionally <strong>friendly and sociable</strong>, reflecting a <strong>diverse range of temperaments</strong>. This
          powerful bond between humans and animals goes beyond physical care—it's shaped by <strong>emotional and psychological understanding</strong>,
          essential for both <strong>health</strong> and <strong>performance</strong> in the <strong>competitive arena</strong> of Kambala.
        </p>
      </section>
      `,
    
      `
      <section class="space-y-4">
        <h3 class="text-2xl font-semibold text-[#7A3E3E]">Conclusion</h3>
        <p class="text-gray-700 text-lg leading-relaxed">
          <strong>Kambala</strong>, though once <strong>banned in 2014</strong> due to animal welfare concerns, was <strong>legalized again in 2017</strong>.
          In <strong>May 2023</strong>, the <strong>Supreme Court</strong> upheld its legality, recognizing it as a <strong>traditional folk sport</strong>
          akin to <strong>Jallikattu</strong> and <strong>Bull Cart Races</strong>.
        </p>
        <p class="text-gray-700 text-lg leading-relaxed">
          Kambala is more than a sport—it is the <strong>heartbeat of Tulunadu</strong>. It unites <strong>people, heritage, and buffaloes</strong>
          in a spectacular celebration of <strong>resilience</strong>, <strong>unity</strong>, and <strong>tradition</strong>. It mirrors a cultural pride that cannot
          be fully understood without experiencing the passion and community spirit that drive this ancient ritual.
        </p>
      </section>
      `
    ],
    video:"",
    author: 'Jeevan Shetty',
    date: '2025-07-10',
    readTime: '7 min read',
    image: ['/blog-images/KambalaBlog/Screenshot 2025-06-30 at 11.02.23 PM.png'],
    tags: ['Tulu Language', 'Tigalari Script', 'Literature', 'Oral Traditions'],
    category: 'Art Forms',
    audioAvailable: true

  },
  {
    id: 'Kadri-Nath-Panth',
    title: 'Kadri & the Nath Panth',
video:"",
    excerpt: 'A mystic sanctuary tracing the spiritual lineage of Nath yogis and their esoteric traditions.',
  contentParts :[
      `
      <section class="space-y-4">
        <h2 class="text-3xl font-bold text-[#5B3C88]">The Nath Panth</h2>
        <p class="text-gray-700 text-lg leading-relaxed">
          The <strong>Natha cult</strong> represents a unique fusion of <strong>Buddhist Avalokiteshvara</strong> and <strong>Shaivaite tantric</strong> traditions,
          particularly the <strong>Kapalika</strong> and <strong>Kaula</strong> sects. 
          <strong>Macchendra Nath</strong> and his disciple <strong>Gorakh Nath</strong> were key figures who propagated the Nath philosophy.
        </p>
        <p class="text-gray-700 text-lg leading-relaxed">
          During the <strong>8th to 10th centuries</strong>, the Nath cult spread across <strong>India</strong> and <strong>Sri Lanka</strong>. Over time, it evolved into 
          <strong>twelve distinct sub-sects</strong>, known as the <strong>“Bara-pantha”</strong>. 
          <strong>Natha Yogis</strong> were known for their long-distance spiritual pilgrimages by foot.
        </p>
        <p class="text-gray-700 text-lg leading-relaxed">
          The influence of the Nath cult is visible in major <strong>Shaiva centres</strong> like <strong>Srishaila</strong>. The term <strong>“Natha”</strong> is a shortened form of 
          <strong>“Lokeswara Natha”</strong>, as per <strong>Buddhist literature from Sri Lanka</strong>, showing its syncretic nature.
        </p>
      </section>
      `,
    
      `
      <section class="space-y-4">
        <h3 class="text-2xl font-semibold text-[#3A6B70]">Kadri</h3>
        <p class="text-gray-700 text-lg leading-relaxed">
          It is believed that <strong>Matsyendranath</strong> stayed and worshipped at <strong>Kadri</strong>, the location of the famous <strong>Kadri Manjunatha Temple</strong>.
          There, he established a <strong>Lingam</strong> (symbol of Lord Shiva) and began worship in the name of <strong>“Manjunatha”</strong>.
        </p>
        <p class="text-gray-700 text-lg leading-relaxed">
          <strong>Macchendra Natha</strong> gained the <strong>patronage of local rulers</strong>, who granted him <strong>administrative authority</strong> over the lands
          surrounding the temple and honored him with the title <strong>“Kadri Arasaru”</strong>.
        </p>
        <p class="text-gray-700 text-lg leading-relaxed">
          In a spiritually significant event, <strong>Gorakshnath</strong> is believed to have <strong>merged with the lingam</strong> of <strong>Lord Manjunatha</strong> at Kadri,
          symbolizing his union with the divine. This transformed <strong>Kadri</strong> into a revered pilgrimage site for followers of the 
          <strong>Nath Sampradaya</strong>.
        </p>
      </section>
      `
    ],
    author: 'Jeevan Shetty',
    date: '2025-07-10',
    readTime: '9 min read',
    image: ['/blog-images/kadriBlog/D7FB2855-3E57-4AF4-9578-3CA02246CA30.jpeg'
   
     ],
    tags: ['Udupi Temple', 'Madhvacharya', 'Spiritual Heritage', 'Architecture'],
    category: 'Temple',
    audioAvailable: true
  },
  {
    id: 'Neer-Dosa',
    title: 'Neer Dosa',
    excerpt: 'Delicately thin and soft rice crepes that melt in your mouth—Tulunadu’s signature breakfast delight.',
     contentParts : [
      `
      <section class="space-y-4">
        <h2 class="text-3xl font-bold text-[#2F4F4F]">Introduction</h2>
        <p class="text-gray-800 text-lg leading-relaxed">
          The birthplace of <strong>Neer Dosa</strong> lies in the heart of the <strong>Tulu-speaking community</strong>. 
          The word <strong>"Neer"</strong> translates to <strong>“water”</strong> in Tulu, indicating the dosa’s unique <strong>thin and translucent</strong> nature.
        </p>
        <p class="text-gray-800 text-lg leading-relaxed">
          Originally a <strong>local delicacy</strong>, Neer Dosa has grown in popularity due to its <strong>simplicity, versatility, and quick preparation</strong>. 
          Its batter—a simple mix of <strong>rice</strong> and sometimes <strong>grated coconut</strong>—requires <strong>no fermentation</strong>, making it a <strong>convenient and fast</strong> choice.
        </p>
        <p class="text-gray-800 text-lg leading-relaxed">
          When poured thinly over a hot griddle, it forms a <strong>lacy, soft crepe</strong> that is both <strong>light and flavorful</strong>. 
          The use of <strong>coconut</strong> imparts healthy fats and a distinct coastal aroma, while the <strong>minimal use of oil</strong> makes it gentle on the stomach.
        </p>
      </section>
      `,
    
      `
      <section class="space-y-4">
        <h3 class="text-2xl font-semibold text-[#3B7C71]">Preparation of Neer Dosa</h3>
        <p class="text-gray-800 text-lg leading-relaxed">
          Neer Dosa is primarily made from <strong>soaked rice, water</strong>, and a <strong>pinch of salt</strong>. 
          Some recipes also include <strong>grated coconut</strong> for extra richness.
        </p>
        <ul class="list-disc list-inside text-gray-800 text-lg space-y-2">
          <li><strong>Rice:</strong> Typically short-grain rice like <em>Tukda</em> or <em>Kolam</em>, though other varieties are also used.</li>
          <li><strong>Water:</strong> Added generously to achieve the <strong>thin, watery consistency</strong> of the batter.</li>
          <li><strong>Salt:</strong> A small amount for taste.</li>
          <li><strong>Grated Coconut (Optional):</strong> Enhances flavor and provides coastal richness.</li>
        </ul>
        <p class="text-gray-800 text-lg leading-relaxed">
          The rice is <strong>soaked overnight</strong> or for several hours, then ground into a <strong>smooth, buttermilk-like batter</strong>. 
          It’s poured onto a <strong>hot griddle</strong> and cooked <strong>without flipping</strong>, resulting in a <strong>soft and delicate dosa</strong>.
        </p>
        <p class="text-gray-800 text-lg leading-relaxed">
          Neer Dosa is not just a dish—it’s a celebration of <strong>coastal culinary wisdom</strong> and <strong>generations of Tulu tradition</strong>.
        </p>
      </section>
      `,
    
      `
      <section class="space-y-4">
        <h3 class="text-2xl font-semibold text-[#3B7C71]">Benefits</h3>
        <p class="text-gray-800 text-lg leading-relaxed">
          <strong>Neer Dosa</strong> is widely recognized as a <strong>healthy choice</strong> among dosa varieties. 
          It is <strong>gluten-free</strong>, <strong>low in fat</strong>, and <strong>easy to digest</strong> due to its <strong>non-fermented, oil-free</strong> preparation.
        </p>
      </section>
      `
    ],
    video:"",
    author: 'jeevan shetty',
    date: '2024-11-20',
    readTime: '6 min read',
    image: ['/blog-images/NeerBlog/69B8133F-95C1-4B16-B115-77B9C2BBC6EC.jpeg'],
    tags: ['Spice Gardens', 'Agriculture', 'Trade Heritage', 'Mangalore'],
    category: 'Food & Cuisine',
    audioAvailable: true
  },
  {
    id: 'Delta-Point',
    title: 'Delta Point',
    excerpt: 'Delta Point in Udupi is the enchanting location where the Suvarna and Swarna rivers',
     contentParts : [
      `
      <section class="space-y-4">
  <h2 class="text-3xl font-bold text-[#2F4F4F]">Introduction</h2>
  <p class="text-gray-800 text-lg leading-relaxed">
    <strong>Delta Point</strong> in <strong>Udupi</strong> is the enchanting location where the <strong>Suvarna and Swarna rivers</strong> merge into the <strong>Arabian Sea</strong>. 
    This serene riverside estuary has become a favorite attraction for <strong>travelers and nature lovers</strong>, offering a <strong>picturesque landscape</strong>, 
    <strong>rich biodiversity</strong>, and a <strong>peaceful ambiance</strong>.
  </p>
</section>
   

  <p class="text-gray-800 text-lg leading-relaxed">
    Delta Point is located about <strong>8–10 kilometers from Udupi town</strong>, on the outskirts where the rivers flow into the sea. 
    It is accessible via <strong>auto-rickshaw, taxi, or bus</strong>. For a scenic experience, travelers often take a <strong>boat ride</strong> from a nearby jetty. 
    The roads are well-maintained and <strong>parking is available</strong> near the river's edge.
  </p>

    <p class="text-gray-800 text-lg leading-relaxed">
    Visitors witness a <strong>beautiful fusion of river, sea, greenery, and wildlife</strong>. The calm river currents blend with the rhythmic ocean waves, 
    surrounded by <strong>mangroves and coconut palms</strong>. <strong>Sunrise and sunset</strong> transform the sky into a golden canvas reflected on water, 
    making the location feel <strong>tranquil and slightly remote</strong>—a perfect escape from the city.
  </p>
</section>
 `,
         `
<section class="space-y-4">
  <h3 class="text-2xl font-semibold text-[#3B7C71]">What to Do & Experience</h3>
  <ul class="list-disc list-inside text-gray-800 text-lg space-y-2">
    <li><strong>Boat rides:</strong> Glide across the estuary and enjoy close-up views of the rivers meeting; spot estuarine species like kingfishers.</li>
    <li><strong>Photography:</strong> Capture merging waters, lush landscapes, fishing boats, and golden lighting—perfect for Instagram.</li>
    <li><strong>Nature walks:</strong> Explore small riverside paths amidst birds, mangroves, and fresh coastal air.</li>
    <li><strong>Fishing:</strong> Observe or chat with locals fishing by the riverbanks—an authentic touch of riverside life.</li>
    <li><strong>Picnicking:</strong> Enjoy tea or snacks under a palm tree beside the peaceful river edge.</li>
  </ul>
</section>
 `,
         `
<section class="space-y-4">
  <h3 class="text-2xl font-semibold text-[#3B7C71]">Best Time to Visit</h3>
  <p class="text-gray-800 text-lg leading-relaxed">
    The best time to visit is between <strong>October and February</strong> when the weather is pleasant and waters are calm. 
    <strong>Early mornings</strong> bring a misty serenity, while <strong>sunsets</strong> offer stunning views. 
    Avoid the <strong>monsoon season (June–September)</strong> due to rough currents and muddy water.
  </p>
</section>
 `,
         `
<section class="space-y-4">
  <h3 class="text-2xl font-semibold text-[#3B7C71]">Nearby Attractions</h3>
  <ul class="list-disc list-inside text-gray-800 text-lg space-y-2">
    <li><strong>Malpe Beach:</strong> Known for water sports, camel rides, beach shacks, and lively vibes—just a short walk away.</li>
    <li><strong>St. Mary’s Island:</strong> Famous for its unique columnar rock formations and turquoise waters; accessible by boat from Malpe.</li>
    <li><strong>Udupi Sri Krishna Temple:</strong> A spiritual Vaishnavite temple located around 6 km from Delta Point.</li>
    <li><strong>Seafood Cafes:</strong> Local eateries near Malpe serve authentic Mangalorean dishes, including fish fry and homemade ice creams.</li>
  </ul>
</section>
 `,
         `
<section class="space-y-4">
  <h3 class="text-2xl font-semibold text-[#3B7C71]">Cleanliness & Safety</h3>
  <p class="text-gray-800 text-lg leading-relaxed">
    Though relatively <strong>undeveloped</strong>, Delta Point retains a raw, untouched charm. 
    <strong>Dustbins are available</strong> near the boat jetty, but there are <strong>no restrooms or cafes</strong> nearby. 
    Visitors should <strong>carry water, stick to marked paths, avoid littering</strong>, and ensure they wear <strong>life vests when boating</strong> with verified local operators.
  </p>
</section>
 `,
         `
<section class="space-y-4">
  <h3 class="text-2xl font-semibold text-[#3B7C71]">Conclusion</h3>
  <p class="text-gray-800 text-lg leading-relaxed">
    <strong>Delta Point, Udupi</strong> is a <strong>serene, offbeat gem</strong> that captures the <strong>poetry of water meeting water</strong>—a quiet confluence of rivers, sea, greenery, and sky. 
    Its <strong>peaceful charm, scenic walks, boat rides, and birdlife</strong> make it a refreshing escape from crowded beaches. 
    Perfect for <strong>photography, contemplation, and reconnecting with nature</strong>, Delta Point is a <strong>hidden treasure</strong> on Karnataka’s coast and a <strong>must-visit for those seeking tranquility</strong> off the usual tourist path.
  </p>
</section>
      
      `
    ],
    video:"",
    author: 'Agricultural Heritage Team',
    date: '2024-11-20',
    readTime: '6 min read',
    image: ['/blog-images/DeltaBlog/Screenshot 2025-07-18 at 1.15.11 PM.png'],
    tags: ['Spice Gardens', 'Agriculture', 'Trade Heritage', 'Mangalore'],
    category: 'Beaches',
    audioAvailable: true
  },
  {
    id: 'Kori-Rotti',
    title: 'Kori Rotti',
    excerpt: 'A traditional and iconic dish from Tulu Nadu',
     contentParts : [
      `
      <section class="space-y-4">
  <h2 class="text-3xl font-bold text-[#2F4F4F]">Introduction</h2>
  <p class="text-gray-800 text-lg leading-relaxed">
    <strong>Kori Rotti</strong> is a traditional and iconic dish from <strong>Tulu Nadu</strong>, a coastal region in Karnataka that includes <strong>Udupi</strong> and <strong>Dakshina Kannada</strong> districts.
    A bold and flavorful representation of <strong>Mangalorean cuisine</strong>, Kori Rotti brings together <strong>tender chicken simmered in a spicy coconut-based gravy</strong>, served with <strong>crisp rice wafers</strong> called rotti.
    The name itself translates to <strong>“chicken with crisp dry wafers”</strong>—a culinary heritage passed down through generations.
  </p>
</section>
   `,
     `
<section class="space-y-4">
  <h3 class="text-2xl font-semibold text-[#3B7C71]">Origin and Cultural Significance</h3>
  <p class="text-gray-800 text-lg leading-relaxed">
    <strong>Kori Rotti</strong> has its roots deeply embedded in the <strong>Tuluva (Bunt) community</strong>, which has inhabited the coastal belt of Karnataka for centuries.
    This dish is a staple during <strong>festivals, weddings, family functions, and temple feasts</strong>, symbolizing <strong>hospitality and celebration</strong>.
  </p>
  <p class="text-gray-800 text-lg leading-relaxed">
    It represents the blend of <strong>South Indian cooking techniques</strong> with <strong>coastal ingredients</strong> like coconut, red chillies, and curry leaves.
    <strong>Tulu Nadu cuisine</strong> is renowned for its <strong>spice-forward flavors</strong>, <strong>unique combinations</strong>, and its emphasis on <strong>taste and aroma</strong>.
    Kori Rotti stands out as a <strong>flagship dish</strong> that introduces outsiders to the region’s rich culinary identity.
  </p>
</section>
 `,
     `
<section class="space-y-4">
  <h3 class="text-2xl font-semibold text-[#3B7C71]">Key Components of Kori Rotti</h3>
  <ul class="list-disc list-inside text-gray-800 text-lg space-y-2">
    <li>
      <strong>Kori Gassi (Chicken Curry):</strong> A fiery red coconut-based gravy with <em>red byadgi chillies</em>, <em>grated coconut</em>, <em>onions</em>, <em>garlic</em>,
      <em>coriander</em>, <em>jeera</em>, and tempered with <em>curry leaves</em> and <em>mustard seeds</em>. Known for its <strong>spicy, smoky, and aromatic flavor</strong>
      with a <strong>thick consistency</strong>.
    </li>
    <li>
      <strong>Rotti (Crispy Rice Wafers):</strong> Thin, crunchy wafers made from boiled rice. <strong>Salt- and oil-free</strong>, they are neutral in taste—perfect for soaking up
      the spicy curry. Traditionally <strong>homemade or bought fresh</strong> from shops in <strong>Udupi and Mangalore</strong>.
    </li>
  </ul>
</section>
 `,
     `
<section class="space-y-4">
  <h3 class="text-2xl font-semibold text-[#3B7C71]">How It Is Prepared</h3>
  <p class="text-gray-800 text-lg leading-relaxed">
    The curry begins with <strong>dry-roasting spices</strong> and grinding them with coconut to form a <strong>rich masala paste</strong>. 
    Chicken is then <strong>cooked in this paste</strong> with coconut milk or water to create a <strong>luscious, thick gravy</strong>.
  </p>
  <p class="text-gray-800 text-lg leading-relaxed">
    The <strong>rotti</strong> is <strong>broken into small pieces</strong> and spread on a plate. Just before serving, <strong>hot curry is poured over it</strong>, allowing it to soak in.
    The base becomes soft while the top remains crunchy, offering a <strong>unique dual texture</strong> that is both <strong>satisfying and distinct</strong>.
  </p>
</section>
 `,
     `
<section class="space-y-4">
  <h3 class="text-2xl font-semibold text-[#3B7C71]">Conclusion</h3>
  <p class="text-gray-800 text-lg leading-relaxed">
    <strong>Kori Rotti</strong> is more than just a dish—it is a <strong>cultural symbol</strong> of <strong>Tulu Nadu</strong>. With its <strong>bold flavors, rustic preparation, and unique textures</strong>,
    it captures the essence of <strong>coastal Karnataka’s culinary artistry</strong>. Whether enjoyed during a traditional feast or at a modern restaurant,
    it continues to <strong>delight food lovers</strong> and stands as a <strong>proud ambassador</strong> of Tulu heritage and South Indian cuisine.
  </p>
</section>
      `
    ],
    video:"",
    author: 'jeevan shetty',
    date: '2025-07-10',
    readTime: '6 min read',
    image: ['/blog-images/KorriRottiBlog/Screenshot 2025-07-18 at 12.41.16 PM.png'],
    tags: ['Spice Gardens', 'Agriculture', 'Trade Heritage', 'Mangalore'],
    category: 'Food & Cuisine',
    audioAvailable: true
  },
  {
    id: 'Maravanthe-Beach',
    title: 'Maravanthe Beach',
    excerpt: 'Maravanthe Beach is  Karnataka’s most enchanting coastal jewels, located along the scenic NH-66',
     contentParts : [
      `
     <section class="space-y-4">
  <h2 class="text-3xl font-bold text-[#2F4F4F]">Introduction</h2>
  <p class="text-gray-800 text-lg leading-relaxed">
    <strong>Maravanthe Beach</strong> is one of Karnataka’s most enchanting coastal jewels, located along the scenic <strong>NH-66</strong>, where the road runs between the <strong>Arabian Sea</strong> and the <strong>Souparnika River</strong>. 
    Known for its <strong>surreal views</strong>, <strong>untouched beauty</strong>, and <strong>tranquil atmosphere</strong>, Maravanthe offers a <strong>distinctive experience of land sandwiched by water</strong>.
  </p>
</section>
   


    
 `,
         `
<section class="space-y-4">
  <h3 class="text-2xl font-semibold text-[#3B7C71]">Location, Landscape & Activities</h3>
  <ul class="list-disc list-inside text-gray-800 text-lg space-y-2">
    <li><strong>Location:</strong> About 90 km north of Mangalore and 40 km from Udupi, easily accessible via <strong>NH-66</strong>. The nearest railway station is <strong>Kundapura</strong>, and <strong>Mangalore Airport</strong> is roughly 1.5 hours away.</li>
    <li><strong>Natural Beauty:</strong> With the <strong>Arabian Sea</strong> on one side and the <strong>Souparnika River</strong> on the other, the beach offers golden sands, palm-fringed shores, and turquoise waters. A perfect destination for <strong>serenity and rustic charm</strong>.</li>
    <li><strong>Things to Do:</strong> Enjoy <strong>coastal strolls</strong>, <strong>photography</strong> of reflections and contrasts, <strong>boat rides</strong> on the river, <strong>family picnics</strong>, and activities like <strong>fishing and birdwatching</strong> near the estuary.</li>
  </ul>
</section>
 `,
         `
<section class="space-y-4">
  <h3 class="text-2xl font-semibold text-[#3B7C71]">Best Time to Visit</h3>
  <p class="text-gray-800 text-lg leading-relaxed">
    The best time to visit is between <strong>October and February</strong> when the weather is pleasant and waters are calm. 
    <strong>Early mornings</strong> bring a misty serenity, while <strong>sunsets</strong> offer stunning views. 
    Avoid the <strong>monsoon season (June–September)</strong> due to rough currents and muddy water.
  </p>
</section>
 `,
         `
<section class="space-y-4">
  <h3 class="text-2xl font-semibold text-[#3B7C71]">Nearby Attractions</h3>
  <ul class="list-disc list-inside text-gray-800 text-lg space-y-2">
    <li><strong>Malpe Beach:</strong> Known for water sports, camel rides, beach shacks, and lively vibes—just a short walk away.</li>
    <li><strong>St. Mary’s Island:</strong> Famous for its unique columnar rock formations and turquoise waters; accessible by boat from Malpe.</li>
    <li><strong>Udupi Sri Krishna Temple:</strong> A spiritual Vaishnavite temple located around 6 km from Delta Point.</li>
    <li><strong>Seafood Cafes:</strong> Local eateries near Malpe serve authentic Mangalorean dishes, including fish fry and homemade ice creams.</li>
  </ul>
</section>
 `,
        

         `
<section class="space-y-4">
  <h3 class="text-2xl font-semibold text-[#3B7C71]">Cleanliness, Safety & Conclusion</h3>
  <p class="text-gray-800 text-lg leading-relaxed">
    Maravanthe remains <strong>largely unspoiled</strong> with limited commercialization. Basic facilities like <strong>benches and food stalls</strong> are available, but it's advisable to carry <strong>drinking water</strong>. 
    Visitors should be cautious along the <strong>riverbanks and shorelines</strong>, especially during high tide—wear suitable footwear and stick to safe paths.
  </p>
  <p class="text-gray-800 text-lg leading-relaxed">
    <strong>Maravanthe Beach</strong> is a rare treasure where <strong>sea and river blend side-by-side</strong> in a breathtaking setting. With its <strong>serene vibes, panoramic scenery, and unique location</strong>, 
    it offers a perfect retreat for coastal explorers. Whether for <strong>dawn reflections, peaceful strolls, or quiet escape</strong>, Maravanthe is one of Karnataka's most <strong>unforgettable natural gems</strong>.
  </p>
</section>
      
      `
    ],
    video:"",
    author: 'jeevan shetty',
    date: '2025-07-10',
    readTime: '6 min read',
    image: ['/blog-images/MarvantheBlog/Screenshot 2025-07-18 at 2.10.17 PM.png'],
    tags: ['Spice Gardens', 'Agriculture', 'Trade Heritage', 'Mangalore'],
    category: 'Beaches',
    audioAvailable: true
  },
  {
    id: 'Padubidri-Beach',
    title: 'Padubidri Beach',
    excerpt: 'Located in the Udupi district of Karnataka, is a hidden gem along India’s west coast',
     contentParts : [
      `<section class="space-y-4">
  <h2 class="text-3xl font-bold text-[#2F4F4F]">Introduction</h2>
  <p class="text-gray-800 text-lg leading-relaxed">
    <strong>Padubidri Beach</strong>, located in the Udupi district of Karnataka, is a hidden gem along India’s west coast. 
    Recognized with the prestigious <strong>Blue Flag certification</strong> for cleanliness and sustainability, this beach blends 
    <strong>natural beauty</strong> with <strong>eco-conscious tourism</strong>. With its calm waves, clean sands, and modern amenities, Padubidri 
    offers a peaceful yet well-equipped coastal retreat that stands out among Karnataka’s beaches.
  </p>
</section>`,
         `
<section class="space-y-4">
  <h3 class="text-2xl font-semibold text-[#3B7C71]">Location, Highlights & Activities</h3>
  <ul class="list-disc list-inside text-gray-800 text-lg space-y-2">
    <li><strong>Location:</strong> About 24 km south of Udupi and 50 km north of Mangalore, easily reachable via <strong>NH-66</strong>.</li>
    <li><strong>Accessibility:</strong> 
      <ul class="ml-5 list-disc">
        <li>By road – well-connected buses/taxis.</li>
        <li>By train – <strong>Padubidri Railway Station</strong> nearby.</li>
        <li>By air – <strong>Mangalore International Airport</strong> (1 hour away).</li>
      </ul>
    </li>
    <li><strong>Scenic Beauty:</strong> Golden sands, clear blue waters, and palm-lined shores make it ideal for <strong>sunset photography</strong> and serene beach walks.</li>
    <li><strong>Blue Flag Certification:</strong> Awarded for meeting global standards in <strong>water quality, environmental management, safety, and education</strong>. The beach has:
      <ul class="ml-5 list-disc">
        <li>Solar-powered lighting & CCTV</li>
        <li>Restrooms, changing rooms & drinking water</li>
        <li>Wheelchair-friendly pathways & lifeguards</li>
      </ul>
    </li>
    <li><strong>Things to Do:</strong> 
      <ul class="ml-5 list-disc">
        <li><strong>Water Sports:</strong> Jet skiing, banana boat rides, water scooters</li>
        <li><strong>Photography:</strong> Stunning sunsets, coconut groves, vibrant beach life</li>
        <li><strong>Relaxation:</strong> Gazebos, benches, and peaceful surroundings</li>
        <li><strong>Observe Local Life:</strong> Watch fishermen or kids playing beach games</li>
      </ul>
    </li>
  </ul>
</section>
   `
,
         `<section class="space-y-4">
  <h3 class="text-2xl font-semibold text-[#3B7C71]">Best Time to Visit & Nearby Attractions</h3>
  <p class="text-gray-800 text-lg leading-relaxed">
    The best time to visit is from <strong>October to March</strong>—cool weather, calm waters, and vivid skies make this period ideal for all beach activities. 
    The <strong>monsoon season (June to September)</strong> brings rough seas and heavy rainfall, limiting access and water activities.
  </p>
  <ul class="list-disc list-inside text-gray-800 text-lg space-y-2">
    <li><strong>Padubidri End Point:</strong> Where the river meets the sea—perfect for tranquil nature walks.</li>
    <li><strong>Mahalingeshwara Temple & Brahmasthana:</strong> Historic and culturally significant temples.</li>
    <li><strong>Dakkebali Ritual:</strong> A sacred ritual attracting pilgrims, performed once every few years.</li>
    <li><strong>Local Food & Culture:</strong> Try authentic Udupi-style meals in small eateries around the beach town.</li>
  </ul>
</section>`,
        

         `
<section class="space-y-4">
  <h3 class="text-2xl font-semibold text-[#3B7C71]">Cleanliness, Safety & Conclusion</h3>
  <p class="text-gray-800 text-lg leading-relaxed">
    As part of the <strong>Blue Flag initiative</strong>, Padubidri Beach is maintained as a <strong>zero plastic zone</strong>, with regular cleanup drives and 
    <strong>eco-awareness campaigns</strong>. A small entrance fee (₹20–₹30) helps sustain these efforts. Visitors can expect clean surroundings, 
    safety infrastructure, and an overall responsible tourism model.
  </p>
  <p class="text-gray-800 text-lg leading-relaxed">
    In conclusion, <strong>Padubidri Beach</strong> is not just scenic—it’s a showcase of <strong>sustainable tourism done right</strong>. Whether you seek 
    adventure, photography, or peaceful contemplation by the sea, this Blue Flag beach offers an <strong>eco-friendly and memorable coastal experience</strong> 
    that reflects the best of Karnataka’s shoreline.
  </p>
</section>
      `
    ],
    video:"",
    author: 'jeevan shetty',
    date: '2025-07-10',
    readTime: '6 min read',
    image: ['/blog-images/Padbudri/Screenshot 2025-07-18 at 4.16.21 PM.png'],
    tags: ['Spice Gardens', 'Agriculture', 'Trade Heritage', 'Mangalore'],
    category: 'Beaches',
    audioAvailable: true
  },
  {
    id: 'Panambur-Beach',
    title: 'Panambur Beach',
    excerpt: 'Panambur Beach  located just 10 km north of Mangalore ',
     contentParts : [
      `<section class="space-y-4">
  <h2 class="text-3xl font-bold text-[#2F4F4F]">Introduction</h2>
  <p class="text-gray-800 text-lg leading-relaxed">
    <strong>Panambur Beach</strong> is located just <strong>10 km north of Mangalore</strong>, right beside the <strong>New Mangalore Port</strong> along the NH‑66. 
    The name "Panambur" is derived from the Tulu words <em>panam</em> (money) and <em>uru</em> (place). Easily accessible via city buses (from State Bank to Surathkal), 
    auto-rickshaws, taxis, or private vehicles, the beach can be reached within <strong>20–30 minutes</strong> from the airport or major transit points.
  </p>
</section>
   `,
 `
<section class="space-y-4">
  <h3 class="text-2xl font-semibold text-[#3B7C71]">Scenic Beauty, Facilities & Activities</h3>
  <ul class="list-disc list-inside text-gray-800 text-lg space-y-2">
    <li><strong>Atmosphere:</strong> Clean golden sands, calm waves, and wide-open spaces make it an ideal beach for families and groups.</li>
    <li><strong>Sunsets:</strong> The beach offers <strong>dramatic sunset views</strong> with silhouettes of anchored cargo ships and port breakwaters.</li>
    <li><strong>Maintenance:</strong> Privately managed under Mangaluru City Corporation with clean facilities and security patrols.</li>
    <li><strong>Safety:</strong> Lifeguards and patrol vehicles are active. Swimming is monitored and restricted during high tide or rough currents.</li>
    <li><strong>Amenities:</strong> Restrooms, changing rooms, eateries, paid parking, and seafood stalls available on-site.</li>
    <li><strong>Things to Do:</strong> 
      <ul class="ml-5 list-disc">
        <li><strong>Water Sports:</strong> Parasailing, jet skiing, banana boat rides, and ATVs on the beach</li>
        <li><strong>Camel & Horse Rides:</strong> Unique coastal experiences not commonly found on most Indian beaches</li>
        <li><strong>Dolphin-spotting & Boat Rides:</strong> Available via local operators</li>
        <li><strong>Beach Festivals:</strong> Includes <em>Karavali Utsav</em>, <em>Sand Sculpture Contest</em>, and the internationally acclaimed <em>Kite Festival</em></li>
        <li><strong>Photography:</strong> Capture sunlit waves, wide skies, and bustling port silhouettes</li>
      </ul>
    </li>
  </ul>
</section>
`,
 `
<section class="space-y-4">
  <h3 class="text-2xl font-semibold text-[#3B7C71]">Best Time to Visit & Nearby Attractions</h3>
  <ul class="list-disc list-inside text-gray-800 text-lg space-y-2">
    <li><strong>Best Season:</strong> <strong>October–February</strong> for ideal weather and calm seas.</li>
    <li><strong>Special Events:</strong> April is perfect for the <em>Kite Festival</em> on the beach.</li>
    <li><strong>Avoid:</strong> <strong>June–September</strong> due to monsoons and rough wave conditions.</li>
  </ul>
  <p class="text-gray-800 text-lg leading-relaxed">Nearby places to explore:</p>
  <ul class="ml-5 list-disc text-gray-800 text-lg space-y-1">
    <li><strong>New Mangalore Port:</strong> Watch large ships dock at India’s major west coast cargo hub.</li>
    <li><strong>Beach Cabanas:</strong> Stay at places like BluBay with scenic sea views.</li>
    <li><strong>Cultural Spots:</strong> Visit <strong>St. Aloysius Chapel</strong>, <strong>Pilikula Nisargadhama</strong>, <strong>Tannirbhavi Beach</strong>, and <strong>Kadri Temple</strong> (within 10–15 km).</li>
  </ul>
</section>
`,
 `
<section class="space-y-4">
  <h3 class="text-2xl font-semibold text-[#3B7C71]">Cleanliness, Eco-Efforts & Conclusion</h3>
  <ul class="list-disc list-inside text-gray-800 text-lg space-y-2">
    <li><strong>Cleanliness:</strong> Frequently ranked among <strong>India’s cleanest beaches</strong> in independent surveys.</li>
    <li><strong>Sustainability:</strong> Maintained through private partnerships and zero-litter awareness events.</li>
  </ul>
  <p class="text-gray-800 text-lg leading-relaxed">
    <strong>Panambur Beach</strong> stands as Mangaluru’s most beloved urban shoreline—vibrant, accessible, and safe. Whether you're chasing the thrill of water sports, 
    enjoying cultural festivals, or soaking in tranquil sunsets, Panambur offers something for everyone. It’s a <strong>must-visit gem</strong> on Karnataka’s coast that beautifully balances 
    fun, safety, and natural splendor.
  </p>
</section>
      ` 
    ],
    video:"",
    author: 'jeevan shetty',
    date: '2025-07-10',
    readTime: '6 min read',
    image: ['/blog-images/PanamburBeachblog/Screenshot 2025-07-19 at 12.50.42 AM.png'],
    tags: ['Spice Gardens', 'Agriculture', 'Trade Heritage', 'Mangalore'],
    category: 'Beaches',
    audioAvailable: true
  },
  {
    id: 'Suruthkal-Beach',
    title: 'Surathkal Beach',
    excerpt: ' NITK Surathkal Beach A hidden gem located directly behind the campus of the National Institute of Technology Karnataka',
     contentParts : [
      `
   <section class="space-y-4">
  <h2 class="text-3xl font-bold text-[#1E3A8A]">Introduction</h2>
  <p class="text-gray-800 text-lg leading-relaxed">
    <strong>NITK Surathkal Beach</strong> is a hidden gem located directly behind the campus of the <strong>National Institute of Technology Karnataka</strong> in Surathkal, just 20 km north of Mangalore.
    This pristine beach is loved for its serenity, clean sands, and spectacular sunsets, especially from the viewpoint near the lighthouse.
  </p>
</section>
   `,
     `
<section class="space-y-4">
  <h3 class="text-2xl font-semibold text-[#2563EB]">Why It's Special</h3>
  <ul class="list-disc list-inside text-gray-800 text-lg space-y-2">
    <li><strong>Unspoiled shoreline:</strong> Minimal commercial activity keeps it peaceful</li>
    <li><strong>Lighthouse viewpoint:</strong> A stunning spot to watch the Arabian Sea meet the sky</li>
    <li><strong>Student retreat:</strong> A favorite for NITK students and faculty seeking calm</li>
  </ul>
</section>
 `,
     `
<section class="space-y-4">
  <h3 class="text-2xl font-semibold text-[#2563EB]">How to Reach</h3>
  <p class="text-gray-800 text-lg leading-relaxed">
    The beach is within walking distance of the NITK campus and is easily accessible via local buses or autos from <strong>Surathkal Junction</strong>. It's about 25–30 minutes from Mangalore city by car.
  </p>
  <ul class="list-disc list-inside text-gray-700 text-lg space-y-1">
    <li><strong>Nearest Rail:</strong> Surathkal Railway Station</li>
    <li><strong>By Road:</strong> Located just off NH-66</li>
    <li><strong>Nearest Airport:</strong> Mangalore International Airport (~20 km)</li>
  </ul>
</section>
 `,
     `
<section class="space-y-4">
  <h3 class="text-2xl font-semibold text-[#2563EB]">When to Visit</h3>
  <p class="text-gray-800 text-lg leading-relaxed">
    <strong>October to February</strong> is the best time to enjoy pleasant weather and calm seas. Avoid visiting during the monsoon months (June to September) due to rough tides and heavy rains.
  </p>
  <p class="text-gray-800 text-lg leading-relaxed">
    Ideal for <strong>sunset photography, evening strolls, and peaceful reflection</strong>, NITK Beach remains one of the most underrated destinations in Karnataka’s coastal belt.
  </p>
</section>
 `
    ],
    video:"",
    author: 'jeevan shetty',
    date: '2025-07-10',
    readTime: '6 min read',
    image: ['/blog-images/Surathkalbeach/Screenshot 2025-07-20 at 1.19.48 AM.png'],
    tags: ['Spice Gardens', 'Agriculture', 'Trade Heritage', 'Mangalore'],
    category: 'Beaches',
    audioAvailable: true
  },

  {
    id: 'Sea-Walk',
    title: 'Sea walk',
    excerpt: 'Sea Walk in Udupi is a unique and scenic promenade located near the popular Malpe Beach',
     contentParts : [
      `
<section class="space-y-4">
  <h2 class="text-3xl font-bold text-[#1E3A8A]">Introduction</h2>
  <p class="text-gray-800 text-lg leading-relaxed">
    The <strong>Sea Walk in Udupi</strong> is a unique and scenic promenade located near the popular <strong>Malpe Beach</strong>. Built as a stone jetty extending into the <strong>Arabian Sea</strong>, it offers an extraordinary experience of walking over water while surrounded by crashing waves, flying seabirds, and expansive views of the sea. It's a favorite spot for those seeking a quiet moment with nature, a great photograph, or a beautiful sunset.
  </p>
</section>
   `,
     `
<section class="space-y-4">
  <h3 class="text-2xl font-semibold text-[#2563EB]">📍 Location & Accessibility</h3>
  <p class="text-gray-800 text-lg leading-relaxed">
    Located just <strong>6 km from Udupi town</strong>, the Sea Walk is close to <strong>Malpe Fishing Harbor</strong>. It is easily accessible via taxi, bus, or auto-rickshaw. Visitors with private vehicles will find ample parking. The connecting road is well-developed, and it’s common to pair a visit here with <strong>Malpe Beach</strong>.
  </p>
</section>
<section class="space-y-4">
  <h3 class="text-2xl font-semibold text-[#2563EB]">🌴 Activities & Experiences</h3>
  <ul class="list-disc list-inside text-gray-800 text-lg space-y-2">
    <li><strong>Leisure walks:</strong> Ideal for morning or evening strolls in a calm environment.</li>
    <li><strong>Photography:</strong> Perfect for capturing crashing waves, sunsets, and birds in flight.</li>
    <li><strong>Birdwatching:</strong> Spot coastal birds like seagulls perched on rocks or in the air.</li>
    <li><strong>Boating views:</strong> Watch fishing boats sail by or return to the harbor with fresh catch.</li>
    <li><strong>Relaxation:</strong> Benches along the route invite you to sit, unwind, or meditate by the sea.</li>
  </ul>
</section>
 `,
     `
<section class="space-y-4">
  <h3 class="text-2xl font-semibold text-[#2563EB]">🗓 Best Time & Nearby Attractions</h3>
  <p class="text-gray-800 text-lg leading-relaxed">
    The best time to visit is from <strong>October to February</strong>, when the weather is cool and clear. <strong>Early mornings</strong> are peaceful and ideal for sunrise, while <strong>sunsets</strong> draw crowds for their beauty. Avoid the <strong>monsoon season (June–September)</strong> due to rough seas and slippery rocks.
  </p>
  <ul class="list-disc list-inside text-gray-800 text-lg space-y-2">
    <li><strong>Malpe Beach:</strong> Just steps away, offering water sports, beach shacks, and camel rides.</li>
    <li><strong>St. Mary’s Island:</strong> Famous for lava rock formations; accessible by boat from Malpe.</li>
    <li><strong>Udupi Krishna Temple:</strong> A major pilgrimage site located ~6 km from the Sea Walk.</li>
    <li><strong>Seafood Cafes:</strong> Enjoy local Mangalorean cuisine including fish fry, ice cream, and more.</li>
  </ul>
</section>
 `,
     `
<section class="space-y-4">
  <h3 class="text-2xl font-semibold text-[#2563EB]">♻ Safety, Cleanliness & Final Thoughts</h3>
  <p class="text-gray-800 text-lg leading-relaxed">
    The Sea Walk is maintained by local authorities with dustbins, signage, and occasional security personnel. Wear <strong>comfortable shoes</strong>, avoid slippery edges, and be cautious during high tide or strong winds. 
  </p>
  <p class="text-gray-800 text-lg leading-relaxed">
    In conclusion, the <strong>Udupi Sea Walk</strong> is more than a coastal walkway—it's a tranquil escape into nature. Whether you're a solo traveler, a couple, or a family, it offers a memorable experience filled with scenic beauty and quiet charm.
  </p>
</section>
 `

      
    ],
    video:"",
    author: 'jeevan shetty',
    date: '2025-07-10',
    readTime: '6 min read',
    image: ['/blog-images/SeaWalkBlog/Screenshot 2025-07-20 at 1.32.06 AM.png'],
    tags: ['Spice Gardens', 'Agriculture', 'Trade Heritage', 'Mangalore'],
    category: 'Beaches',
    audioAvailable: true
  },
  {
    id: 'Chicken-Ghee-Roast',
    title: 'Chicken Ghee Roast',
    excerpt: 'Chicken Ghee Roast is a fiery, aromatic delicacy from Mangalore, Karnataka..',
     contentParts : [
      `
      <section class="space-y-4">
  <h2 class="text-3xl font-bold text-[#8B0000]">Introduction</h2>
  <p class="text-gray-800 text-lg leading-relaxed">
    <strong>Chicken Ghee Roast</strong> is a fiery, aromatic delicacy from <strong>Mangalore</strong>, Karnataka. Slow-cooked in pure <strong>desi ghee</strong> with a deeply spiced <strong>Kundapur-style masala</strong>,
    this dish is bold, rich, and layered with complex flavors. It’s famous for its intense red color from <strong>Byadgi chilies</strong> and its thick, semi-dry texture that clings to every bite of chicken.
  </p>
</section>
   `,
     `
<section class="space-y-4">
  <h3 class="text-2xl font-semibold text-[#C1440E]">Origin and Uniqueness</h3>
  <p class="text-gray-800 text-lg leading-relaxed">
    This iconic dish was first created in the 1950s at the legendary <strong>Shetty Lunch Home</strong> in <strong>Kundapur</strong>, near Udupi. The signature masala—made by roasting spices and grinding with garlic and tamarind—
    delivers heat, tang, and a depth that’s unforgettable. Traditionally made without onions or tomatoes, it depends purely on the <strong>strength of its spices and ghee</strong>.
  </p>
  <ul class="list-disc list-inside text-lg text-gray-700 space-y-1">
    <li><strong>Byadgi red chilies</strong> for color & mild heat</li>
    <li><strong>Ghee-based cooking</strong> promotes digestion and enhances aroma</li>
    <li><strong>Ayurvedic logic meets culinary mastery</strong></li>
  </ul>
</section>
 `,
     `
<section class="space-y-4">
  <h3 class="text-2xl font-semibold text-[#C1440E]">Ingredients & Preparation</h3>
  <ul class="list-disc list-inside text-gray-800 text-lg space-y-2">
    <li><strong>Chicken (500g):</strong> Marinated with turmeric, salt, and lemon juice</li>
    <li><strong>Masala:</strong> Byadgi chilies, cumin, coriander, fennel, peppercorns, garlic, tamarind</li>
    <li><strong>Cooking:</strong> Chicken is first sautéed in ghee, then combined with the masala and slow-roasted until oil separates</li>
    <li><strong>Finish:</strong> Jaggery (optional) and curry leaves for balance and aroma</li>
  </ul>
</section>
 `,
     `
<section class="space-y-4">
  <h3 class="text-2xl font-semibold text-[#C1440E]">Serving & Significance</h3>
  <p class="text-gray-800 text-lg leading-relaxed">
    <strong>Chicken Ghee Roast</strong> is best served with <strong>Neer Dosa</strong>, <strong>parotta</strong>, or <strong>plain steamed rice</strong>. Its luxurious ghee-laden masala and melt-in-mouth texture
    make it a highlight of <strong>coastal Karnataka cuisine</strong>. Loved by chefs, home cooks, and foodies alike—it’s a must-try for anyone exploring South Indian flavors.
  </p>
</section>
 `,
     `
<section class="space-y-4">
  <h3 class="text-2xl font-semibold text-[#3B7C71]">Conclusion</h3>
  <p class="text-gray-800 text-lg leading-relaxed">
    <strong>Kori Rotti</strong> is more than just a dish—it is a <strong>cultural symbol</strong> of <strong>Tulu Nadu</strong>. With its <strong>bold flavors, rustic preparation, and unique textures</strong>,
    it captures the essence of <strong>coastal Karnataka’s culinary artistry</strong>. Whether enjoyed during a traditional feast or at a modern restaurant,
    it continues to <strong>delight food lovers</strong> and stands as a <strong>proud ambassador</strong> of Tulu heritage and South Indian cuisine.
  </p>
</section>
      `
    ],
    video:"",
    author: 'jeevan shetty',
    date: '2025-07-10',
    readTime: '6 min read',
    image: ['/blog-images/ChickenGheeRoasrBlkog/Screenshot 2025-07-22 at 7.36.47 PM.png'],
    tags: ['Spice Gardens', 'Agriculture', 'Trade Heritage', 'Mangalore'],
    category: 'Food & Cuisine',
    audioAvailable: true
  },
  {
    id: 'Ullal-Beach',
    title: 'Ullal-Beach',
    excerpt: ' A serene and scenic coastal destination .',
     contentParts : [
      `
      <section class="space-y-4">
  <h2 class="text-3xl font-bold text-[#1E3A8A]">Introduction</h2>
  <p class="text-gray-800 text-lg leading-relaxed">
    <strong>Ullal Beach</strong> is a serene and scenic coastal destination located just south of Mangalore city in Karnataka. Less crowded than its neighboring beaches, Ullal offers a peaceful retreat with soft sands, casuarina groves, and a culturally rich backdrop. It is one of the region’s oldest towns, historically significant for its association with <strong>Queen Abbakka Chowta</strong>, the legendary warrior who resisted Portuguese colonization. Ullal blends tranquility, heritage, and natural beauty in one charming spot.
  </p>
</section>
   `,
     `
<section class="space-y-4">
  <h3 class="text-2xl font-semibold text-[#2563EB]">📍 Location & Accessibility</h3>
  <ul class="list-disc list-inside text-gray-800 text-lg space-y-2">
    <li><strong>Distance from Mangalore:</strong> About 10–12 km.</li>
    <li><strong>By Bus:</strong> Regular city buses from State Bank and Kankanady.</li>
    <li><strong>By Train:</strong> Closest major station – Mangalore Central (~12 km); Ullal Railway Station nearby.</li>
    <li><strong>By Air:</strong> Mangalore International Airport (25–30 km).</li>
  </ul>
  <p class="text-gray-800 text-lg leading-relaxed">
    The route includes a scenic coastal drive across the <strong>Ullal Bridge</strong> over the Netravati River.
  </p>
</section>
 `,
     `
<section class="space-y-4">
  <h3 class="text-2xl font-semibold text-[#2563EB]">🌊 First Impressions</h3>
  <p class="text-gray-800 text-lg leading-relaxed">
    Ullal Beach welcomes you with a peaceful, uncrowded ambiance. The sound of gentle waves, cool sea breeze, and shade from casuarina and coconut trees create a naturally relaxing escape. The beach is <strong>clean and uncommercialized</strong>, ideal for peaceful walks, landscape photography, or simply enjoying the horizon.
  </p>
</section>

<section class="space-y-4">
  <h3 class="text-2xl font-semibold text-[#2563EB]">🎯 Things to See & Do</h3>
  <ul class="list-disc list-inside text-gray-800 text-lg space-y-2">
    <li><strong>🌅 Enjoy the Sunset:</strong> Golden-orange sunsets dipping into the Arabian Sea.</li>
    <li><strong>🏝 Explore Historical Sites:</strong> 
      <ul class="list-disc ml-5">
        <li><strong>Queen Abbakka Fort:</strong> Ruins of the fort built by the 16th-century Tulu queen.</li>
        <li><strong>Someshwara Temple:</strong> Seaside temple dedicated to Lord Shiva.</li>
      </ul>
    </li>
    <li><strong>🌊 Beach Walks & Picnics:</strong> Quiet, shaded spots ideal for picnics and reflection.</li>
    <li><strong>🛥 Local Fishing Life:</strong> See fishermen at work, casting nets or fixing boats.</li>
    <li><strong>🏄 Water Sports:</strong> Seasonal activities like jet skiing and banana rides.</li>
    <li><strong>📸 Photography & Birdwatching:</strong> Capture rock formations and seabirds in action.</li>
  </ul>
</section>
 `,
     `
<section class="space-y-4">
  <h3 class="text-2xl font-semibold text-[#2563EB]">🍲 Food & Local Culture</h3>
  <ul class="list-disc list-inside text-gray-800 text-lg space-y-2">
    <li>Street vendors sell <strong>bhel puri</strong>, <strong>ice cream</strong>, and <strong>tender coconut</strong> near the beach.</li>
    <li>Local eateries serve authentic <strong>Tulu & Mangalorean dishes</strong> such as Kori Rotti, Neer Dosa, Fish Curry, and Ghee Roast.</li>
    <li>Languages spoken include <strong>Tulu, Beary, Kannada,</strong> and <strong>Konkani</strong>.</li>
    <li><strong>Sayyid Madani Dargah:</strong> A 400-year-old Islamic shrine symbolizing Ullal’s spiritual diversity.</li>
  </ul>
</section>
<section class="space-y-4">
  <h3 class="text-2xl font-semibold text-[#2563EB]">💖 Best Part of the Visit</h3>
  <p class="text-gray-800 text-lg leading-relaxed">
    The most memorable aspect of Ullal Beach is its <strong>tranquility</strong>. Unlike commercial beaches, it offers a deeply authentic and intimate connection to coastal life. Watching the sun set while fishermen return with their catch captures the soulful charm of this place. The harmony of <strong>local heritage and unspoiled nature</strong> is what makes Ullal truly special.
  </p>
</section>
<section class="space-y-4">
  <h3 class="text-2xl font-semibold text-[#2563EB]">📝 Suggestions for Visitors</h3>
  <ul class="list-disc list-inside text-gray-800 text-lg space-y-2">
    <li><strong>Best Time:</strong> October to March (cooler and clear weather).</li>
    <li><strong>Time of Day:</strong> Early morning or evening for best lighting and breeze.</li>
    <li><strong>Safety Tips:</strong> Avoid deep swimming; supervise children; never swim alone.</li>
    <li><strong>Eco-Tips:</strong> Carry reusable bottles and avoid single-use plastic. Be a responsible traveler.</li>
  </ul>
</section>
<section class="space-y-4">
  <h3 class="text-2xl font-semibold text-[#2563EB]">🎯 Conclusion</h3>
  <p class="text-gray-800 text-lg leading-relaxed">
    <strong>Ullal Beach</strong> is more than a coastal stop — it's a peaceful sanctuary that tells a story of bravery, heritage, and nature’s untouched beauty. Whether you're unwinding under the trees or soaking in cultural history, it offers a deeply personal and unforgettable coastal experience on Karnataka’s shore.
  </p>
</section>
 `,
     `
<section class="space-y-4">
  <h3 class="text-2xl font-semibold text-[#2563EB]">♻ Environment & Cleanliness</h3>
  <ul class="list-disc list-inside text-gray-800 text-lg space-y-2">
    <li>Relatively clean due to low commercial impact.</li>
    <li>Occasional <strong>community-led beach clean-up drives</strong>.</li>
    <li><strong>No dedicated lifeguards</strong> and limited dustbins — visitors should take waste back with them.</li>
    <li>Swimming should be done <strong>with caution</strong> due to strong undercurrents and submerged rocks.</li>
  </ul>
</section>
      `
    ],
    video:"",
    author: 'jeevan shetty',
    date: '2025-07-10',
    readTime: '6 min read',
    image: ['/blog-images/UllalBeachBlog/Screenshot 2025-07-22 at 7.49.29 PM.png'],
    tags: ['Spice Gardens', 'Agriculture', 'Trade Heritage', 'Mangalore'],
    category: 'Beaches',
    audioAvailable: true
  },
   {
    id: 'Malpe',
    title: 'Malpe',
    excerpt:  'The Coastal Gem of Karnataka',
     contentParts : [
      `
  <section class="space-y-4">
  <h2 class="text-3xl font-bold text-[#1E40AF]">🏖 Malpe Beach – The Coastal Gem of Karnataka</h2>
  <p class="text-gray-800 text-lg leading-relaxed">
    <strong>Malpe Beach</strong>, located in the Udupi district of Karnataka on India’s western coast, is one of the most popular and picturesque beaches in the country. Framed by the Arabian Sea, this beach is known for its <strong>golden sands, clean environment, coastal charm</strong>, and vibrant local culture. Once a quiet fishing village, Malpe has evolved into a thriving hub for <strong>tourism, water sports, and seafood experiences</strong>.
  </p>
</section>
<section class="space-y-4">
  <h3 class="text-2xl font-semibold text-[#2563EB]">📍 Location and Accessibility</h3>
  <ul class="list-disc list-inside text-gray-800 text-lg space-y-2">
    <li>Located <strong>6 km from Udupi town</strong>, Karnataka.</li>
    <li>Nearest railway station: <strong>Udupi</strong> — well connected to Mangalore, Bangalore, and Mumbai.</li>
    <li>Nearest airport: <strong>Mangalore International Airport</strong>, approx. 60 km away.</li>
    <li>Frequent taxis and autos are available from Udupi to the beach.</li>
  </ul>
</section>
   `,
     `
<section class="space-y-4">
  <h3 class="text-2xl font-semibold text-[#2563EB]">🌴 Natural Beauty and Scenic Atmosphere</h3>
  <p class="text-gray-800 text-lg leading-relaxed">
    Malpe Beach offers a wide, clean stretch of <strong>soft golden sand</strong> lined with palm trees and caressed by the rhythmic waves of the sea. It’s a peaceful spot for walks, meditation, or beach photography, especially at sunrise and sunset. The sight of <strong>fishing boats</strong> and soaring <strong>seagulls</strong> enhances the coastal charm.
  </p>
</section>
<section class="space-y-4">
  <h3 class="text-2xl font-semibold text-[#2563EB]">🏝 Attractions and Activities</h3>
  <ul class="list-disc list-inside text-gray-800 text-lg space-y-2">
    <li><strong>St. Mary’s Island:</strong> A short ferry ride away, famous for its <strong>88-million-year-old basalt rock formations</strong> and white sandy shores.</li>
    <li><strong>Water Sports:</strong> Jet skiing, parasailing, banana boat rides, speed boating, and volleyball are popular.</li>
    <li><strong>Recreational Fun:</strong> Camel rides, beach biking, and sunbathing zones with facilities like changing rooms and lifeguards.</li>
  </ul>
</section>
 `,
     `
<section class="space-y-4">
  <h3 class="text-2xl font-semibold text-[#2563EB]">🍛 Food and Local Culture</h3>
  <ul class="list-disc list-inside text-gray-800 text-lg space-y-2">
    <li>Seafood stalls offer <strong>fish fry, prawns, squid</strong>, and iconic dishes like <strong>Chicken Ghee Roast</strong> and <strong>Neer Dosa</strong>.</li>
    <li><strong>Gadbad Ice Cream:</strong> A colorful layered dessert originally from Mangalore.</li>
    <li>Local life is rooted in <strong>Tulu and Kannada traditions</strong> with fishing as a daily sight along the coast.</li>
  </ul>
</section>

<section class="space-y-4">
  <h3 class="text-2xl font-semibold text-[#2563EB]">🌿 Cleanliness and Eco-Tourism</h3>
  <p class="text-gray-800 text-lg leading-relaxed">
    Malpe Beach has earned praise for its <strong>cleanliness and sustainable tourism efforts</strong>. Regular cleanup drives, signage promoting eco-friendly behavior, and public amenities like <strong>dustbins, shaded benches, and walking paths</strong> support a responsible beach experience. Tourists are encouraged to avoid single-use plastics and keep the beach pristine.
  </p>
</section>
 `,
     `
<section class="space-y-4">
  <h3 class="text-2xl font-semibold text-[#2563EB]">🗓 Best Time to Visit</h3>
  <p class="text-gray-800 text-lg leading-relaxed">
    The best time to visit is from <strong>October to February</strong> when the weather is cool and dry. These months offer clear skies and calm seas — ideal for beach activities and photography. It’s best to avoid visiting during <strong>monsoon season (June to September)</strong> due to heavy rains and rough waters.
  </p>
</section>
<section class="space-y-4">
  <h3 class="text-2xl font-semibold text-[#2563EB]">📝 Conclusion</h3>
  <p class="text-gray-800 text-lg leading-relaxed">
    <strong>Malpe Beach</strong> is a seamless mix of <strong>natural beauty, cultural heritage, and modern adventure</strong>. From island hopping and thrilling water sports to relaxing with local seafood and connecting with coastal life, it offers something for everyone. Its well-maintained infrastructure and warm hospitality make it a top beach destination in Karnataka’s tourism map.
  </p>
</section>

 `

      
    ],
    video:"",
    author: 'jeevan shetty',
    date: '2025-07-10',
    readTime: '6 min read',
    image: ['/blog-images/MalpeBlog/Screenshot 2025-07-20 at 1.44.57 AM.png'],
    tags: ['Spice Gardens', 'Agriculture', 'Trade Heritage', 'Mangalore'],
    category: 'Beaches',
    audioAvailable: true
  },
   {
    id: 'Kapu-Beach',
    title: 'Kapu Beach',
    excerpt: '🏖 Kapu Beach & Lighthouse – Where Coastal Beauty Meets Heritage',
     contentParts : [
      `
    <section class="space-y-4">
  <strong class="text-3xl text-[#1E3A8A] block">🏖 Kapu Beach & Lighthouse – Where Coastal Beauty Meets Heritage</strong>
  <p class="text-lg text-gray-800">
    <strong>Kapu Beach</strong>, also spelled <strong>Kaup Beach</strong>, is a serene and scenic stretch located in the Udupi district of Karnataka. Known for its golden sands, dramatic rock formations, and the historic lighthouse perched on a rocky outcrop, Kapu blends <strong>natural coastal beauty</strong> with <strong>heritage charm</strong>. Less commercialized than its counterparts, it attracts those seeking peace, tradition, and panoramic sea views.
  </p>
</section>
   `,
     `
<section class="space-y-4">
  <strong class="text-2xl text-[#2563EB] block">📍 Location and Accessibility</strong>
  <ul class="list-disc list-inside text-gray-800 text-lg space-y-2">
    <li>Located <strong>13 km south of Udupi</strong>, and <strong>45 km north of Mangalore</strong>.</li>
    <li>Nearest railway station: <strong>Udupi</strong> — frequent local buses and autos.</li>
    <li>Nearest airport: <strong>Mangalore International Airport</strong>, about 1 hour by road.</li>
    <li>Well-marked route and available parking for private vehicles.</li>
  </ul>
</section>
 `,
     `
<section class="space-y-4">
  <strong class="text-2xl text-[#2563EB] block">🌊 Natural Beauty and Landscape</strong>
  <p class="text-gray-800 text-lg leading-relaxed">
    The beach offers a <strong>raw, untouched coastal landscape</strong>—golden sands, powerful waves, and dramatic black rock formations stretching into the sea. Framed by coconut palms and coastal vegetation, it's perfect for <strong>quiet reflection, romantic strolls</strong>, or <strong>landscape photography</strong>. These rocks create a bold contrast with the sea, serving as both a visual highlight and a natural viewing deck.
  </p>
</section>

<section class="space-y-4">
  <strong class="text-2xl text-[#2563EB] block">🏰 The Historic Lighthouse</strong>
  <p class="text-gray-800 text-lg leading-relaxed">
    Built in <strong>1901 during British rule</strong>, the <strong>Kapu Lighthouse</strong> is a 27-meter-high beacon situated atop a rocky promontory. It is the most iconic structure on the beach. Visitors can climb the lighthouse (open in the evenings for a small fee) for <strong>360° views</strong> of the Arabian Sea, lush coastline, and breathtaking sunsets — a true photographer’s delight.
  </p>
</section>
<section class="space-y-4">
  <strong class="text-2xl text-[#2563EB] block">🌟 Attractions and Activities</strong>
  <ul class="list-disc list-inside text-gray-800 text-lg space-y-2">
    <li>Scenic <strong>photography</strong> of the lighthouse, rocks, and shoreline.</li>
    <li>Evening <strong>beach walks</strong> and peaceful lounging on the sands.</li>
    <li><strong>Lighthouse climb</strong> for panoramic views at sunset.</li>
    <li>Explore nearby <strong>temples</strong> and village markets.</li>
    <li><strong>Cultural programs</strong> during festivals and weekends.</li>
  </ul>
</section>
 `,
     `
<section class="space-y-4">
  <strong class="text-2xl text-[#2563EB] block">🍛 Food and Culture</strong>
  <p class="text-gray-800 text-lg leading-relaxed">
    While food options on the beach are modest, nearby stalls serve <strong>Mangalore buns, bhel puri, fried fish</strong>, and local refreshments like <strong>coconut water, sugarcane juice, and ice creams</strong>. For full meals, head into Kapu town or Udupi. The region is deeply rooted in <strong>Tulu and Kannada traditions</strong>, with a lifestyle centered around <strong>fishing, temples, and coastal agriculture</strong>.
  </p>
</section>

<section class="space-y-4">
  <strong class="text-2xl text-[#2563EB] block">🌿 Cleanliness and Preservation</strong>
  <p class="text-gray-800 text-lg leading-relaxed">
    Thanks to limited commercialization, Kapu Beach remains <strong>clean and naturally preserved</strong>. The lighthouse area is fenced and marked with safety signs. Visitors are advised not to climb rocks during high tide. Local awareness campaigns and community efforts help keep the beach’s ecosystem and visual appeal intact.
  </p>
</section>

 `,
     `
<section class="space-y-4">
  <strong class="text-2xl text-[#2563EB] block">🗓 Best Time to Visit</strong>
  <p class="text-gray-800 text-lg leading-relaxed">
    The ideal time to visit is <strong>October to February</strong>, when the weather is cool and skies are clear. Post-monsoon greenery enhances the view from the lighthouse. Visit during <strong>late afternoon</strong> to explore the beach and enjoy the <strong>sunset from the tower</strong> before it closes.
  </p>
 
  <strong class="text-2xl text-[#2563EB] block">📝 Conclusion</strong>
  <p class="text-gray-800 text-lg leading-relaxed">
    <strong>Kapu Beach</strong> is a unique blend of <strong>seaside serenity, natural drama, and historical depth</strong>. Whether you're climbing its lighthouse for stunning coastal views or simply sitting by the waves, this destination offers a peaceful escape from the mainstream. It’s a true <strong>hidden gem of Udupi</strong> — perfect for personal reflection, quiet exploration, or romantic moments.
  </p>
</section>
      `
    ],
    video:"",
    author: 'jeevan shetty',
    date: '2025-07-10',
    readTime: '6 min read',
    image: ['/blog-images/KapuBlog/PHOTO-2025-07-22-23-18-29.jpg'],
    tags: ['Spice Gardens', 'Agriculture', 'Trade Heritage', 'Mangalore'],
    category: 'Beaches',
    audioAvailable: true
  },
  {
    id: 'Someshwar-Beach',
    title: 'Someshwar Beach',
    excerpt: 'Someshwar Beach – Where Nature and Heritage Meet.',
     contentParts : [
  `
  <section class="space-y-4">
    <strong class="text-3xl text-[#1E3A8A] block">🌊 Someshwar Beach – Where Nature and Heritage Meet</strong>
    <p class="text-lg text-gray-800">
      Someshwar Beach lies in <strong>Ullal</strong>, just south of Mangaluru (around 10 km from the city center).
      Named after the ancient <strong>Somanatha Temple</strong> at its northern tip, this beach is famous for its
      <strong>Rudra Shile</strong> (massive Shiva rock formations), peaceful surroundings, and stunning confluence
      where the <strong>Netravati River</strong> flows into the Arabian Sea.
    </p>
  </section>

  
  <section class="space-y-4">
    <strong class="text-2xl text-[#2563EB] block">📍 Location & Accessibility</strong>
    <ul class="list-disc list-inside text-gray-800 text-lg space-y-2">
      <li><strong>Proximity:</strong> About 9–10 km south of Mangaluru, located in Ullal town.</li>
      <li><strong>Transport:</strong> Easily accessible via NH‑66. Regular buses and autos operate from Mangalore Central, Ullal, and Byndoor. The final stretch involves a scenic river-bridge crossing and a short walk on a rocky path.</li>
      <li><strong>Transit Hubs:</strong> Mangalore Central Railway Station (~10 km), Ullal Bus Stand (~1 km), and Mangalore Airport (~25 km).</li>
    </ul>
  </section>
  `,
  `
  <section class="space-y-4">
    <strong class="text-2xl text-[#2563EB] block">🌅 First Impressions & Natural Beauty</strong>
    <ul class="list-disc list-inside text-gray-800 text-lg space-y-2">
      <li><strong>Golden sands</strong> fringed by coconut and casuarina trees create a serene and shaded atmosphere.</li>
      <li><strong>Rudra Shile:</strong> Large offshore rock formations offering a picturesque setting against the crashing waves.</li>
      <li><strong>River-Sea Confluence:</strong> Near Ottinene Hillock, adding lush greenery and diverse flora and fauna.</li>
    </ul>
  </section>

  <section class="space-y-4">
    <strong class="text-2xl text-[#2563EB] block">🏛 Cultural & Historical Significance</strong>
    <ul class="list-disc list-inside text-gray-800 text-lg space-y-2">
      <li><strong>Somanatha Temple:</strong> Said to date back to the 16th century, during Queen Abbakka's rule. It honors Lord Shiva and hosts events like Maha Shivaratri and Jathra Mela.</li>
      <li><strong>Ottinene Hillock:</strong> A nearby hill rich in medicinal plants, offering panoramic views of the river meeting the sea.</li>
      <li><strong>Nagateertha Pond:</strong> A natural spring beside the temple, believed to be perennial and sacred among pilgrims.</li>
    </ul>
  </section>
  `,
  `
  <section class="space-y-4">
    <strong class="text-2xl text-[#2563EB] block">📸 Activities & Experiences</strong>
    <ul class="list-disc list-inside text-gray-800 text-lg space-y-2">
      <li><strong>Sunset watching:</strong> One of the best coastal spots for dramatic sea-to-sky colors.</li>
      <li><strong>Nature walks & picnics:</strong> Quiet, uncrowded shores perfect for relaxing.</li>
      <li><strong>Photography:</strong> Ideal subjects include the Rudra Shile, temple outlines, and hilltop views.</li>
      <li><strong>Wildlife spotting:</strong> Various coastal and river birds frequent the area.</li>
      <li><strong>Swimming caution:</strong> Due to strong currents and submerged rocks, swimming is not advised.</li>
      <li><strong>Water sports:</strong> Jet skis or banana boats may be available during festival seasons.</li>
    </ul>
  </section>
  `,
  `
  <section class="space-y-4">
    <strong class="text-2xl text-[#2563EB] block">🗓 Timing & Best Visiting Months</strong>
    <ul class="list-disc list-inside text-gray-800 text-lg space-y-2">
      <li><strong>Beach hours:</strong> Open from 6 AM to 6 PM daily.</li>
      <li><strong>Best season:</strong> October to March — pleasant climate, clear skies, calm waters.</li>
      <li><strong>Avoid:</strong> Monsoon months (June–September) due to slippery access and rough seas.</li>
      <li><strong>Ideal moments:</strong> Sunrise and sunset offer the best lighting and vibe.</li>
    </ul>
  </section>

  <section class="space-y-4">
    <strong class="text-2xl text-[#2563EB] block">♻ Cleanliness & Safety</strong>
    <ul class="list-disc list-inside text-gray-800 text-lg space-y-2">
      <li>Declared a <strong>plastic-free zone</strong> in November 2021; plastic use is strictly restricted.</li>
      <li>The beach remains <strong>uncommercialized</strong> — no food stalls or lifeguards, so bring essentials.</li>
      <li>Swimming is discouraged due to <strong>strong undertow</strong> and several reported accidents.</li>
      <li>Police recommend avoiding the area after dark; local patrols may restrict nighttime access.</li>
    </ul>
  </section>
  `,
  `
  <section class="space-y-4">
    <strong class="text-2xl text-[#2563EB] block">📝 Conclusion</strong>
    <p class="text-gray-800 text-lg leading-relaxed">
      <strong>Someshwar Beach</strong> is a serene blend of <strong>natural beauty and spiritual heritage</strong>. From golden sands and rugged rocks to its timeless temple and green hillocks, it appeals to nature lovers, culture seekers, and photographers alike. Its plastic-free approach and tranquil setting make it one of <strong>Mangaluru’s most peaceful coastal escapes</strong>. Just remember — visit during daylight, skip the swim, and leave nothing behind but footprints.
    </p>
  </section>
  `
],
    video:"",
    author: 'jeevan shetty',
    date: '2025-07-10',
    readTime: '6 min read',
    image: ['/blog-images/SomeshwarBeach/Screenshot 2025-07-22 at 10.43.27 PM.png'],
    tags: ['Spice Gardens', 'Agriculture', 'Trade Heritage', 'Mangalore'],
    category: 'Beaches',
    audioAvailable: true
  },
  {
    id: 'Gadbad-Icecream',
    title: 'Gadbad Ice Cream',
    excerpt: 'is not just a dessert .',
      contentParts :[
  `
  <section class="space-y-4">
    <h2 class="text-3xl font-bold text-pink-700">🍨 Gadbad Ice Cream</h2>
    <p><strong>Gadbad Ice Cream</strong> is not just a dessert — it’s an experience! Born in the coastal town of <strong>Udupi</strong>, Karnataka, this vibrant, multi-layered ice cream has become a symbol of coastal Karnataka’s sweet tooth and creativity.</p>
    <p>Known for its chaotic yet delicious mix of flavors, textures, and colors, Gadbad is served in a tall glass, often surprising diners with every spoonful.</p>
  </section>
  `,

  `
  <section class="space-y-4">
    <h3 class="text-2xl font-semibold text-pink-600">📜 Origin and History</h3>
    <p>The dessert was first created in the <strong>1970s</strong> at the famous Ideal Ice Cream Parlour in <strong>Mangalore</strong>, by its founder, <strong>S. Prabhakar Kamath</strong>.</p>
    <p>A customer once asked for "something quick and good" (“jaldi gadbad kar” in Hindi slang), prompting the staff to throw together whatever was available — ice cream, fruits, jelly, dry fruits, and falooda sev — into a tall glass.</p>
    <p>The spontaneous creation was a hit, and thus, <strong>Gadbad</strong> (which means "chaos" or "mess") was born — a fun mix of flavors that turned into a cultural phenomenon in Karnataka.</p>
  </section>
  `,

  `
  <section class="space-y-4">
    <h3 class="text-2xl font-semibold text-pink-600">🧁 What Makes Gadbad Special</h3>
    <ul class="list-disc pl-6 space-y-1">
      <li>Served in transparent tall glasses to show off its colorful layers.</li>
      <li>Combines multiple flavors — vanilla, strawberry, mango, and more.</li>
      <li>Layers of jelly, fruits, nuts, falooda, and ice cream.</li>
      <li>Customizable, yet always vibrant and nostalgic.</li>
      <li>A cool relief in tropical weather, especially along the coast.</li>
    </ul>
  </section>
  `,

  `
  <section class="space-y-4">
    <h3 class="text-2xl font-semibold text-pink-600">🍳 How to Make Gadbad (Assembly Steps)</h3>
    <p>This dessert is all about <strong>layering</strong>, not cooking!</p>
    
    <h4 class="text-xl font-semibold">🥄 Step 1: Prepare Ingredients</h4>
    <ul class="list-disc pl-6 space-y-1">
      <li>Cook and chill falooda sev.</li>
      <li>Dice fruits and keep jelly cubes ready.</li>
      <li>Scoop out ice cream just before serving.</li>
    </ul>
    
    <h4 class="text-xl font-semibold">🧊 Step 2: Layer in Tall Glass</h4>
    <ol class="list-decimal pl-6 space-y-1">
      <li>Add a spoon of jelly cubes at the bottom.</li>
      <li>Add a spoon of fruit (banana, apple).</li>
      <li>Add falooda sev.</li>
      <li>Add 1 scoop of vanilla ice cream.</li>
      <li>Repeat with another jelly + fruit layer.</li>
      <li>Add strawberry or mango ice cream.</li>
      <li>Top with dry fruits and drizzle rose syrup.</li>
      <li>Finish with a cherry on top.</li>
    </ol>
  </section>
  `
],
    video:"",
    author: 'jeevan shetty',
    date: '2025-07-10',
    readTime: '6 min read',
    image: ['/blog-images/GadbdBlog/Screenshot 2025-07-22 at 11.07.35 PM.png'],
    tags: ['Spice Gardens', 'Agriculture', 'Trade Heritage', 'Mangalore'],
    category: 'Food & Cuisine',
    audioAvailable: true
  },
];

export const categories = [
  'All',
  'Temple',
  'Art Forms',
  'Festivals',
  'Beaches',
];

export const featuredPosts = blogPosts.slice(0, 3);

export const getBlogPostById = (id: string): BlogPost | undefined => {
  return blogPosts.find(post => post.id === id);
};
