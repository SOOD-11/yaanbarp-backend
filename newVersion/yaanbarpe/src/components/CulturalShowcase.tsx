import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  Clock,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Helmet } from 'react-helmet-async';
 // assuming you export the given array

const CulturalShowcase = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
   const heritageHighlights = [
    {
      id: 'top-5-sacred-temples',
      title: "Top 5 Sacred Temples",
      description: "Discover the most revered temples showcasing centuries of spiritual heritage",
      image: "/blog-images/polaliBlog/Screenshot 2025-07-23 at 2.26.56 PM.png",
      category: "Tulu Temples",
      readTime: "8 min read",
      details: [
        {
          title: "1. Sri Krishna Matha, Udupi",
          description: "The crown jewel of Tulu Nadu's spiritual landscape, founded by the great philosopher Madhvacharya in the 13th century. Famous for its unique Kanakana Kindi - a silver-plated window through which devotees can view the deity. The temple's daily rituals, traditional Udupi cuisine, and the famous Paryaya festival make it a living center of culture and spirituality.",
          highlights: ["700+ years of continuous worship", "Unique viewing window", "6.8 million annual pilgrims", "Traditional Udupi cuisine origin"]
        },
        {
          title: "2. Polali Rajarajeshwari Temple",
          description: "Dating back to the 8th century, this temple houses a unique clay idol of Goddess Sri Lalita Tripurasundari. Famous for its Chendu festival - a traditional football game symbolizing good vs evil. The temple's architecture features intricate wooden carvings and copper plates, representing the finest examples of traditional Tulu craftsmanship.",
          highlights: ["8th century origins", "Clay idol tradition", "Chendu football festival", "Intricate wooden architecture"]
        },
        {
          title: "3. Kadri Manjunatha Temple",
          description: "Perched atop Kadri Hills, this ancient temple is associated with the Nath Panth tradition. Legend says Matsyendranath established the lingam here, making it significant for Nath Sampradaya followers. The temple offers panoramic views of Mangalore city and houses ancient bronze statues dating back to the 10th century.",
          highlights: ["Hilltop location", "Nath Panth connection", "10th century bronze statues", "Panoramic city views"]
        },
        {
          title: "4. Kollur Mookambika Temple",
          description: "Nestled in the Western Ghats, this temple is dedicated to Goddess Mookambika, a form of Parvati. Unique as it houses both Shiva and Shakti in a single deity form, representing the perfect union of masculine and feminine energies. Surrounded by lush forests and the Souparnika River, offering a mystical experience.",
          highlights: ["Western Ghats location", "Shiva-Shakti unity", "Forest surroundings", "Annual Navaratri celebrations"]
        },
        {
          title: "5. Anantheshwara Temple, Udupi",
          description: "The oldest temple in Udupi, predating even the famous Krishna Matha. Dedicated to Lord Shiva, showcasing the evolution of Dravidian architecture over centuries. Features a unique Chandramouleshwara shrine and hosts the magnificent annual Rathotsava (chariot festival) where ornately decorated chariots are pulled through streets by thousands of devotees.",
          highlights: ["Oldest temple in Udupi", "Dravidian architecture", "Chandramouleshwara shrine", "Annual chariot festival"]
        }
      ]
    },
    {
      id: 'top-10-cultural-festivals',
      title: "Top 10 Cultural Festivals",
      description: "Experience vibrant festivals from Yakshagana to traditional buffalo races",
      image: "/blog-images/KambalaBlog/Screenshot 2025-06-30 at 11.02.23 PM.png",
      category: "Tulu Festivals",
      readTime: "12 min read",
      details: [
        {
          title: "1. Yakshagana Performances",
          description: "The crown jewel of Tulu Nadu's performing arts. These all-night theatrical performances combine dance, music, dialogue, and elaborate costumes to bring ancient epics to life. Performed from November to May, these shows transform village squares into magical theaters. The art form features over 78 active troupes across the region, contributing ₹42 crore annually to the local economy.",
          highlights: ["78 active troupes", "₹42 crore annual contribution", "November to May season", "Stories from Hindu epics"]
        },
        {
          title: "2. Kambala - Buffalo Race",
          description: "Tulu Nadu's most iconic sporting festival, where pairs of buffaloes race through muddy paddy fields. Held from November to March, these races celebrate the bond between farmers and their animals while showcasing the region's agricultural heritage. Features multiple categories including Negilu Ota (plough race) and Hagga Ota (rope race).",
          highlights: ["November to March season", "Multiple race categories", "Supreme Court legalized", "Agricultural heritage celebration"]
        },
        {
          title: "3. Pilivesha - Tiger Dance",
          description: "During Navratri and Krishna Janmashtami, streets come alive with Pilivesha. Performers painted as tigers dance to rhythmic beats in a mesmerizing spectacle that transcends age, gender, and religious boundaries. The dance has two distinct styles: Udupi style (performed during Krishna Janmashtami) and Mangalore style (featured during Dasara).",
          highlights: ["Two distinct styles", "Transcends religious boundaries", "Community participation", "Ancient spirit worship roots"]
        },
        {
          title: "4. Bhuta Kola - Spirit Worship",
          description: "A ritualistic folk dance where performers embody spirits and deities. These ceremonies, held throughout the year but especially during December to March, feature elaborate costumes, fire dancing, and community blessings. Over 400 different spirit forms are documented across 200+ villages, each ceremony reflecting local beliefs and traditions.",
          highlights: ["400+ spirit forms", "200+ villages", "Fire dancing performances", "Community blessing ceremonies"]
        },
        {
          title: "5. Udupi Paryaya Festival",
          description: "The Paryaya festival occurs every two years when the management of Sri Krishna Matha rotates between eight different mathas. This grand celebration features processions, cultural programs, and the ceremonial handover of temple administration. The festival attracts over 500,000 devotees and showcases the democratic tradition of temple management that has continued for over 700 years.",
          highlights: ["Biennial celebration", "Eight matha rotation", "500,000+ devotees", "700+ year tradition"]
        },
        {
          title: "6. Polali Chendu Festival",
          description: "A unique five-day football festival held at Polali Rajarajeshwari Temple, seven days before the Avabritha celebration. Villages Ammunje and Manel compete as rivals, with Bollur and Mallur supporting them. Up to 500 participants may join, making this not just a sport but a cultural ritual symbolizing the eternal battle of good vs. evil.",
          highlights: ["Five-day duration", "Village rivalries", "500+ participants", "Good vs evil symbolism"]
        }
      ]
    },
    {
      id: 'hidden-cultural-gems',
      title: "Hidden Cultural Gems",
      description: "Venture beyond popular destinations to discover secret temples and ancient art forms",
      image: "/blog-images/AC71E7A2-90DD-44B8-9B69-B22583029AE9_4_5005_c.jpeg",
      category: "Hidden Gems",
      readTime: "6 min read",
      details: [
        {
          title: "1. Barkur - The Forgotten Capital",
          description: "Once the capital of the Alupa dynasty, Barkur is now a sleepy town hiding incredible archaeological treasures. The Panchalingeshwara Temple complex features some of the finest stone carvings in coastal Karnataka, dating back to the 14th century. The town's narrow lanes are lined with traditional Tulu houses featuring distinctive red-tiled roofs and wooden pillars. Local artisans still practice ancient crafts like palm leaf manuscript writing and traditional pottery.",
          highlights: ["Former Alupa capital", "14th century stone carvings", "Traditional Tulu houses", "Ancient craft traditions"]
        },
        {
          title: "2. Mudabidri - Jain Heritage Center",
          description: "Known as the 'Jain Kashi', Mudabidri houses 18 ancient Jain temples, including the magnificent Saavira Kambada Basadi (Thousand Pillar Temple) with uniquely carved pillars. The town preserves rare Jain manuscripts and traditional art forms. The annual Rathotsava here is a spectacular event where ornate chariots are pulled through streets lined with centuries-old temples.",
          highlights: ["18 ancient Jain temples", "Thousand Pillar Temple", "Rare Jain manuscripts", "Medieval architecture pinnacle"]
        },
        {
          title: "3. Belur Math Ashram, Malpe",
          description: "This serene ashram, connected to the Ramakrishna Mission, sits quietly near Malpe beach. The ashram maintains a library of ancient texts and conducts traditional Vedic studies that attract scholars from across India. The ashram's meditation halls and peaceful gardens provide a perfect retreat for spiritual seekers, with regular discourses on Advaita Vedanta and traditional music concerts.",
          highlights: ["Ramakrishna Mission connection", "Ancient text library", "Vedic studies center", "Meditation retreats"]
        },
        {
          title: "4. Karkala Gomateshwara",
          description: "The 57-foot monolithic statue of Gomateshwara carved from a single granite block in 1432 CE stands as a testament to Hoysala period artistic excellence. The surrounding hills hide numerous Jain temples and meditation caves. The annual Mahamastakabhisheka ceremony, held every 12 years, transforms the entire region into a pilgrimage destination.",
          highlights: ["57-foot monolithic statue", "1432 CE creation", "Hoysala craftsmanship", "12-year Mahamastakabhisheka ceremony"]
        },
        {
          title: "5. Horanadu Annapoorneshwari Temple",
          description: "Deep in the Western Ghats, this temple dedicated to Goddess Annapoorneshwari offers free meals to all visitors. The temple's unique tradition of 'Akshaya Patra' ensures no one leaves hungry, embodying the spirit of Tulu hospitality. Surrounded by coffee plantations and pristine forests, the temple provides a perfect blend of spirituality and natural beauty.",
          highlights: ["Free meal tradition", "Western Ghats location", "Coffee plantation surroundings", "Akshaya Patra concept"]
        },
        {
          title: "6. Kateel Durgaparameshwari Temple",
          description: "Located on a small island in the Nandini River, this ancient temple is dedicated to Goddess Durga. The temple's unique location requires crossing a bridge to reach, adding to its mystical appeal. Known for its powerful deity and miraculous healing powers, the temple attracts devotees seeking blessings for health and prosperity.",
          highlights: ["River island location", "Bridge crossing required", "Healing powers reputation", "Goddess Durga worship"]
        }
      ]
    },
    {
      id: 'traditional-arts-crafts',
      title: "Traditional Arts & Crafts",
      description: "Meet master craftsmen keeping ancient traditions alive through exceptional skills",
      image: "/blog-images/PiliveshaBlog/DF61DBA2-3A60-43A9-84AC-3BC20A7C392C.jpeg",
      category: "Arts & Crafts",
      readTime: "10 min read",
      details: [
        {
          title: "Yakshagana Costume Making",
          description: "The elaborate costumes are masterpieces of traditional craftsmanship. Master artisans spend months creating each costume using techniques passed down through generations. The Kirita (crown) alone requires over 100 hours of intricate work. These costumes use natural materials like bamboo, cloth, and natural dyes. Each character has specific color codes and designs that help audiences identify them instantly.",
          highlights: ["100+ hours per crown", "Natural materials only", "Character-specific designs", "Supports 200+ families"]
        },
        {
          title: "Traditional Pottery",
          description: "Tulu pottery is renowned for its distinctive red clay vessels used in temples and homes. The potters of Manipal and surrounding villages create everything from massive temple urns to delicate oil lamps using techniques unchanged for centuries. The clay is sourced from specific riverbanks and mixed with natural materials to achieve the characteristic strength and color.",
          highlights: ["Distinctive red clay", "Traditional kiln firing", "Temple and home use", "Centuries-old techniques"]
        },
        {
          title: "Palm Leaf Manuscript Art",
          description: "The ancient art of writing on palm leaves continues, preserving religious texts, medical treatises, and literary works using traditional iron styluses. These manuscripts can last for centuries when properly maintained. The Udupi libraries house thousands of such manuscripts, including rare texts on Ayurveda, astronomy, and philosophy that are found nowhere else in the world.",
          highlights: ["Iron stylus technique", "Centuries-lasting manuscripts", "Rare Ayurvedic texts", "Udupi library collections"]
        },
        {
          title: "Traditional Weaving",
          description: "Tulu handloom weaving produces distinctive cotton and silk fabrics used in traditional clothing and temple decorations. The weavers of Kundapura are particularly famous for their intricate border designs and natural dyeing techniques. Traditional motifs include temple designs, floral patterns, and geometric shapes that have symbolic meanings in Tulu culture.",
          highlights: ["Kundapura weaving center", "Natural dyeing techniques", "Symbolic motifs", "Temple decorations"]
        },
        {
          title: "Wood Carving Traditions",
          description: "The intricate wood carvings found in Tulu temples and traditional homes represent centuries of artistic evolution. Master carvers use jackfruit wood and teak to create elaborate pillars, door frames, and decorative panels. Each carving tells a story, often depicting scenes from Hindu epics or local folklore. The Anantheshwara Temple in Udupi showcases some of the finest examples of this art.",
          highlights: ["Jackfruit wood and teak", "Epic story depictions", "800+ year examples", "Temple architecture integration"]
        },
        {
          title: "Traditional Mask Making",
          description: "The art of creating masks for Bhuta Kola and other ritual performances involves intricate craftsmanship passed down through generations. Each mask represents a specific deity or spirit, with unique colors, expressions, and decorative elements. The process involves wood carving, painting with natural pigments, and adding decorative elements like metal work and fabric.",
          highlights: ["Deity-specific designs", "Natural pigment painting", "Metal work integration", "Generational knowledge transfer"]
        }
      ]
    }
  ];
  const categories = ['All', ...Array.from(new Set(heritageHighlights.map((item) => item.category)))];

  const filteredHighlights =
    activeCategory === 'All'
      ? heritageHighlights
      : heritageHighlights.filter((item) => item.category === activeCategory);

  const currentHighlight = filteredHighlights[0];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.scroll-reveal').forEach((el) => {
      observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="py-16 sm:py-20 lg:py-24 px-4 md:px-8 bg-gradient-to-b from-tulu-sand/20 to-background">
      <Helmet>
  <title>{currentHighlight.title} | Living Heritage of Tulunadu – YaanBarpe</title>
  <meta name="description" content={currentHighlight.description} />
  <meta name="keywords" content={`Tulunadu, ${currentHighlight.category}, Tulu Culture, ${currentHighlight.title}, yaanbarpe, heritage`} />
  <meta name="author" content="YaanBarpe Team" />

  {/* Open Graph */}
  <meta property="og:type" content="article" />
  <meta property="og:title" content={`${currentHighlight.title} | YaanBarpe`} />
  <meta property="og:description" content={currentHighlight.description} />
  <meta property="og:image" content={`https://www.yaanbarpe.in${currentHighlight.image}`} />
  <meta property="og:url" content={`https://www.yaanbarpe.in/culturalheritage/${currentHighlight.id}`} />

  {/* Twitter */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={`${currentHighlight.title} | YaanBarpe`} />
  <meta name="twitter:description" content={currentHighlight.description} />
  <meta name="twitter:image" content={`https://www.yaanbarpe.in${currentHighlight.image}`} />
  <meta name="twitter:site" content="@yaanbarpe" />

  {/* Canonical */}
  <link rel="canonical" href={`https://www.yaanbarpe.in/culturalheritage/${currentHighlight.id}`} />

  {/* JSON-LD Structured Data */}
  <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": currentHighlight.title,
      "description": currentHighlight.description,
      "image": `https://www.yaanbarpe.in${currentHighlight.image}`,
      "author": {
        "@type": "Organization",
        "name": "YaanBarpe"
      },
      "publisher": {
        "@type": "Organization",
        "name": "YaanBarpe",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.yaanbarpe.in/favicon.ico"
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://www.yaanbarpe.in/culturalheritage/${currentHighlight.id}`
      }
    })}
  </script>
</Helmet>
      <div className="max-w-6xl mx-auto text-center scroll-reveal">
        <Badge className="mb-4 sm:mb-6 bg-gradient-to-r from-tulu-green to-tulu-blue text-white px-4 sm:px-6 py-2">
          <BookOpen className="w-4 h-4 mr-2" />
          Cultural Heritage
        </Badge>

        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
          <span className="bg-gradient-to-r from-tulu-blue via-tulu-teal to-tulu-green bg-clip-text text-transparent">
            Living Heritage
          </span>{' '}
          <span className="text-tulu-red">of Tulu Nadu</span>
        </h1>

        <p className="text-muted-foreground text-base sm:text-lg lg:text-xl max-w-4xl mx-auto leading-relaxed mb-8 sm:mb-12">
          Explore the rich cultural tapestry of Tulu Nadu through sacred temples, vibrant festivals,
          ancient art forms, and hidden gems that showcase centuries of living heritage.
        </p>

        {/* Category Filter */}
        <div className="flex justify-center flex-wrap gap-3 mb-8 sm:mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm sm:text-base font-medium border transition-all
                ${activeCategory === category
                  ? 'bg-tulu-blue text-white border-tulu-blue'
                  : 'bg-white text-tulu-blue border-tulu-blue hover:bg-tulu-blue/10'
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12 max-w-4xl mx-auto">
          <Card className="border border-slate-200 shadow-sm bg-white/80 backdrop-blur-sm">
            <CardContent className="p-3 sm:p-4 text-center">
              <div className="text-xl sm:text-2xl font-bold text-tulu-blue mb-1">50+</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Tulu Temples</div>
            </CardContent>
          </Card>
          <Card className="border border-slate-200 shadow-sm bg-white/80 backdrop-blur-sm">
            <CardContent className="p-3 sm:p-4 text-center">
              <div className="text-xl sm:text-2xl font-bold text-tulu-green mb-1">25+</div>
              <div className="text-xs sm:text-sm text-muted-foreground"> Tulu Festivals</div>
            </CardContent>
          </Card>
          <Card className="border border-slate-200 shadow-sm bg-white/80 backdrop-blur-sm">
            <CardContent className="p-3 sm:p-4 text-center">
              <div className="text-xl sm:text-2xl font-bold text-tulu-red mb-1">15+</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Art Forms</div>
            </CardContent>
          </Card>
          <Card className="border border-slate-200 shadow-sm bg-white/80 backdrop-blur-sm">
            <CardContent className="p-3 sm:p-4 text-center">
              <div className="text-xl sm:text-2xl font-bold text-tulu-gold mb-1">800+</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Years History</div>
            </CardContent>
          </Card>
        </div>

        {/* Highlight Card */}
        {currentHighlight && (
          <Card className="overflow-hidden border-none shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            <div className="relative w-full aspect-[4/3] sm:aspect-[5/3] lg:aspect-auto lg:h-full overflow-hidden rounded-xl">
                <img
                  src={currentHighlight.image}
                  alt={currentHighlight.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />

                <div className="absolute top-4 left-4">
                  <Badge className="bg-tulu-teal/90 text-white text-xs sm:text-sm backdrop-blur-sm">
                    {currentHighlight.category}
                  </Badge>
                </div>

                <div className="absolute bottom-4 left-4">
                  <Badge className="bg-black/50 text-white backdrop-blur-sm text-xs sm:text-sm">
                    <Clock className="w-3 h-3 mr-1" />
                    {currentHighlight.readTime}
                  </Badge>
                </div>
              </div>

              <CardContent className="p-6 sm:p-8 lg:p-12">
                <h3 className="font-display text-xl sm:text-2xl lg:text-3xl font-bold mb-4 text-tulu-blue">
                  {currentHighlight.title}
                </h3>
                <p className="text-muted-foreground text-sm sm:text-base mb-6 leading-relaxed">
                  {currentHighlight.description}
                </p>

                <div className="space-y-6 max-h-64 overflow-y-auto">
                  {currentHighlight.details.map((detail, index) => (
                    <div key={index} className="border-l-4 border-tulu-teal pl-4">
                      <h4 className="font-semibold text-base sm:text-lg mb-2 text-tulu-blue">
                        {detail.title}
                      </h4>
                      <p className="text-muted-foreground text-xs sm:text-sm mb-3 leading-relaxed">
                        {detail.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {detail.highlights.map((highlight, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {highlight}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  <Button
                    className="bg-gradient-to-r from-tulu-blue to-tulu-teal hover:from-tulu-teal hover:to-tulu-green text-white group w-full sm:w-auto"
                    asChild
                  >
                    <Link to="/culturalheritage">
                      Read Full Article
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CulturalShowcase;