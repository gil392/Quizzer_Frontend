import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import SummaryPage from './pages/Summary'
import QuizPage from './pages/Quiz';
import HomePage from './pages/home/Home'


function App() {
  const dummyQuestions = [
    {
      question: 'What is the capital of France?',
      options: [
        { text: 'Paris', number: 1 },
        { text: 'London', number: 2 },
        { text: 'Berlin', number: 3 },
        { text: 'Madrid', number: 4 },
      ],
      correctAnswer: 1,
    },
    {
      question: 'Which programming language is used for web development?',
      options: [
        { text: 'Python', number: 1 },
        { text: 'JavaScript', number: 2 },
        { text: 'C++', number: 3 },
        { text: 'Java', number: 4 },
      ],
      correctAnswer: 2,
    },
    {
      question: 'What is 2 + 2?',
      options: [
        { text: '3', number: 1 },
        { text: '4', number: 2 },
        { text: '5', number: 3 },
        { text: '6', number: 4 },
      ],
      correctAnswer: 2,
    },
  ];
  return (
    <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/home" replace />} />
                <Route
                  path="/home"
                  element={<HomePage />}
                />
                <Route path="/summary" element={<SummaryPage videoTitle="Sample Video" videoSummary="Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, harum reiciendis culpa natus nihil iure tenetur nesciunt, cumque alias repudiandae sint quasi suscipit, fuga pariatur eius eaque! Nulla, tenetur optio.
    Beatae, sequi deleniti! Excepturi mollitia ratione quisquam facere suscipit, culpa itaque sapiente? Corrupti hic totam dolor aut. Consequuntur in molestiae reprehenderit sunt maiores molestias modi, nostrum vero at, quis libero.
    Placeat a velit ipsam tenetur ex fugit corporis quo impedit, ratione architecto quasi, illum earum quam accusantium dolore? Nobis quisquam facere blanditiis illo quas quidem. Ipsa explicabo voluptates perferendis enim!
    Reiciendis, in veritatis animi natus aliquam pariatur ipsam praesentium nisi culpa odio architecto molestiae ut eius, nulla nobis iusto, aspernatur maxime excepturi! Iste ipsam soluta esse accusamus, sapiente facere eaque!
    Aperiam ducimus totam reprehenderit, consequuntur perspiciatis fugit quas expedita incidunt ea dolores voluptate, sequi odit accusamus ipsum dolorum. Corporis dignissimos, minus itaque hic numquam quas. Quis, accusamus nulla. Voluptate, eveniet.
    Ea eaque labore vel nam, molestias obcaecati est incidunt saepe cum! Quidem porro cum velit nam, corrupti qui? Quisquam minus in sed odit modi id? Quaerat, at voluptas! Ullam, expedita.
    Alias accusantium debitis eaque nobis aliquam, quia maxime perferendis. Ex veniam deserunt, ipsum consequatur inventore earum asperiores nisi non eveniet sit molestiae dolor, ut quidem quod reprehenderit impedit omnis corporis!
    Explicabo totam deserunt quas harum iure reiciendis laborum sed est omnis illo tempore quibusdam dignissimos soluta, quod numquam architecto error cupiditate molestias facere nemo aperiam ab similique aliquid! Aut, ea?
    Molestiae libero voluptatibus natus! Aut sit iure quaerat eum, sunt voluptates nobis totam sequi quod blanditiis, aspernatur in aperiam harum eius exercitationem. Nesciunt fugiat nihil optio accusamus unde quia voluptas.
    Eaque ex, sapiente animi adipisci omnis voluptatum delectus ullam est quisquam recusandae reprehenderit itaque, doloribus libero ea porro. Aliquid sunt commodi pariatur reprehenderit error tempore voluptatem aut, ad vel totam.
    Ex quia eius, impedit numquam voluptatem corrupti, repudiandae eaque obcaecati molestiae veniam, corporis amet consectetur doloremque nobis vero at! Temporibus deserunt esse, eius consequatur pariatur ducimus tempora reiciendis quae ratione.
    Eveniet amet a vitae non odit? Natus commodi facere ea odit deserunt corrupti deleniti numquam odio at quo. Ut hic enim veritatis eligendi doloribus, corrupti harum quae numquam molestiae ab?
    Corporis et necessitatibus odio ad iusto itaque quis optio dolorum eligendi, voluptatibus fugit corrupti perferendis assumenda blanditiis, voluptatem sint! Ducimus consectetur alias odio? Omnis, corrupti veniam officiis optio aut ad?
    Fugit cum sunt esse numquam ea, animi laudantium sint dolores odit nam debitis porro voluptatem ad perferendis delectus nesciunt voluptas velit. Tenetur amet aliquam recusandae veniam commodi dicta eum voluptatem.
    Modi amet unde, blanditiis deleniti quo eius accusantium aspernatur? Iure, consequatur! Unde omnis quasi eligendi, qui, nemo sed ipsam aliquid nam sapiente quas harum dolorem fugit praesentium enim laborum rerum.
    Perspiciatis in quibusdam nisi, aspernatur recusandae iusto. Facere repellendus iure ad voluptatem non laboriosam eaque quae, ut eos totam veniam ullam facilis voluptas. Consectetur, molestiae animi? Neque dignissimos excepturi iusto.
    Atque deserunt, possimus ab consequuntur ea corporis velit beatae iusto vitae inventore! Aliquam commodi obcaecati tempore impedit consectetur repudiandae ab quam omnis molestiae. Voluptate hic voluptatibus aspernatur inventore, ea natus?
    Voluptatibus sunt unde culpa esse beatae numquam deleniti est quo eius earum aliquam, reprehenderit ipsum eum tenetur quia, nostrum dignissimos adipisci? Quos sint sit at necessitatibus labore dolorum beatae totam.
    Iure nisi vel in culpa! Quaerat quas nam ut eos rerum recusandae minima corporis aspernatur cumque quisquam ea culpa provident fugit est asperiores, alias qui impedit aut eaque veniam ducimus?
    Perspiciatis deleniti cupiditate perferendis vero quibusdam adipisci dignissimos ullam maxime deserunt saepe voluptatem eaque pariatur voluptatum omnis modi, enim nisi ratione cumque iure, nesciunt tenetur. Vitae ducimus voluptatem beatae atque.
    Reiciendis illum unde excepturi, ullam animi nesciunt tempora, cumque tempore voluptatum ipsam magni, est itaque vitae fugiat illo aperiam. Voluptatem rerum minus sapiente sit consequatur velit, molestiae nostrum quasi ducimus!
    Ipsa odio rerum dolor, animi quisquam iusto accusamus dignissimos totam neque minima adipisci ullam ratione debitis necessitatibus. Molestias, numquam? Necessitatibus dolorem nostrum error corrupti, et sed eum provident pariatur at!
    A, dolorem commodi dolores unde, earum deleniti laborum adipisci perspiciatis maiores harum error blanditiis ducimus ut iure quasi. Quibusdam dolorem soluta repudiandae atque harum ea, quaerat laboriosam ad sapiente eius?
    Necessitatibus soluta neque quo expedita asperiores voluptates at, possimus amet incidunt blanditiis harum a architecto doloremque nisi sit, ut adipisci ullam quas deserunt. Reprehenderit in aliquam adipisci iure totam hic.
    Dolorem modi corrupti dolor, earum recusandae natus illo praesentium voluptas magnam sapiente! Porro laudantium ad neque quae qui possimus dignissimos a sed voluptatum sunt, odio libero quidem saepe mollitia debitis!
    Laborum adipisci atque hic fugit quis debitis, reprehenderit officia veniam similique quibusdam corporis sed eos odit aspernatur accusantium molestias porro labore totam cumque pariatur facere quia quas! Numquam, consequuntur voluptatem!
    Officiis dolore corrupti enim cum pariatur minima tempore maiores. Quo reprehenderit impedit vero, illum ex repellendus suscipit iusto dicta, harum vel saepe ipsam aperiam voluptatibus minima dolorum dolores nam quos.
    Inventore atque numquam magnam praesentium delectus fuga maxime accusantium nam quas. Accusantium, veniam. Voluptatibus, et eligendi amet possimus reiciendis autem dolor molestias repellat aperiam eaque soluta dolorem quos blanditiis eos.
    Nihil, et. Facilis culpa quisquam temporibus minus quo, tenetur placeat amet inventore unde omnis recusandae eos dolore? Quia ratione illum magnam deserunt, quod fuga fugit esse voluptatibus nemo hic quidem.
    Assumenda itaque aspernatur voluptatum repudiandae, deleniti, incidunt veritatis temporibus explicabo, voluptas omnis amet. Nesciunt ducimus, sunt necessitatibus, excepturi quae eveniet nobis cum quam quasi nam eum, labore mollitia autem deserunt.
    Error voluptas voluptatibus fuga omnis dolorem, asperiores corporis perferendis blanditiis non? Expedita, tempore exercitationem commodi facere suscipit, corrupti voluptatum tenetur quo eos quibusdam fugiat ratione quidem fuga itaque magni et.
    Sint obcaecati qui corrupti delectus ex eum aliquam officiis iure, architecto deleniti nostrum cupiditate consectetur maxime, maiores vitae culpa quibusdam reiciendis nesciunt perspiciatis atque possimus quo itaque eaque ipsa? Modi.
    Ad aliquam quia sit similique est nostrum, atque voluptatibus, id tempora, labore odit cum ducimus nihil consequuntur reprehenderit perspiciatis! Tenetur, quisquam magnam ad nostrum cum eius architecto obcaecati consectetur laborum!
    Possimus sapiente exercitationem aspernatur obcaecati vero assumenda reiciendis veniam dolore minus sint, enim et sequi. Consequatur recusandae officia laboriosam natus est magnam laborum voluptatibus inventore perspiciatis, sed molestias. Aliquam, deleniti.
    Sunt sequi obcaecati facere suscipit laudantium. Neque aspernatur veritatis molestias voluptatum aut voluptate sapiente dolor dolorum quaerat? Harum, reiciendis sequi fuga facere voluptate eum a id ullam deleniti qui nisi?
    Incidunt, blanditiis exercitationem debitis ea veniam libero aliquid quis itaque, corporis, officia non error fuga explicabo fugiat quas! Dicta cumque officiis impedit, maxime eaque eius beatae maiores culpa quaerat eum!
    Atque ad deserunt corporis assumenda dolor expedita incidunt a dolorum recusandae officia inventore saepe neque culpa doloremque, quae, doloribus voluptatem. Earum sunt maxime recusandae velit, vel exercitationem pariatur maiores tempora.
    Iusto, porro. Itaque corrupti asperiores excepturi molestias voluptatibus consequatur vero inventore nostrum eveniet voluptates harum amet ducimus accusantium nesciunt quasi sunt, ipsam optio architecto libero quibusdam doloremque, praesentium voluptatum. Suscipit.
    Nisi et esse atque rem ipsa aliquam facere dolor accusantium. Perferendis corporis voluptatem, dignissimos reiciendis pariatur corrupti, debitis cum dolorem quasi inventore libero repudiandae magnam? Et quibusdam earum amet architecto.
    Esse, ipsam, suscipit voluptatum dolorum officiis quisquam quae, facere doloremque autem magni sequi voluptates veniam. Reprehenderit quod totam magni cupiditate veniam eum aspernatur? Facilis aut repellat, tempora aspernatur suscipit est.
    Facere est natus inventore, tempore veritatis libero aliquid, fuga laboriosam provident saepe doloremque molestiae eaque deserunt modi ratione nihil dolor facilis praesentium recusandae sequi eligendi minus nam? Iure, nihil iste.
    Quam soluta dolor officiis aliquam sunt dolore adipisci, eos ab! Corporis, perspiciatis sit! Nobis, quas laborum? Ipsum corporis animi ipsa aliquam dolorum fugiat veritatis obcaecati, excepturi ducimus autem deserunt aspernatur!
    Cumque, assumenda vel! Ipsam voluptatum placeat repudiandae nihil hic necessitatibus sint consequatur modi? At, accusantium quis dolores laborum, nisi adipisci tempore dicta ex ullam ratione labore voluptates, obcaecati nemo maxime!
    Doloremque maiores dolore at eveniet iure officiis, repellendus quod porro exercitationem minus harum autem necessitatibus rerum consectetur sint corrupti corporis sequi cupiditate, natus deserunt ipsum sunt? Id tempora necessitatibus molestiae.
    At inventore ipsum eum sequi, facilis pariatur aperiam, quam recusandae animi culpa eius dolor laborum laudantium. Commodi eveniet perspiciatis quia reiciendis temporibus ab, quasi assumenda? Magni ea totam rerum molestiae!
    Pariatur possimus reiciendis modi quaerat! Voluptates odio ullam ex aspernatur incidunt nam praesentium ut unde tempora, accusamus nobis reprehenderit quisquam doloribus sequi numquam. Itaque sint vero laudantium est illo ad.
    Dignissimos omnis commodi eos unde aliquid rem assumenda, recusandae voluptatem in mollitia. Nisi aut pariatur neque eum soluta asperiores perferendis cumque commodi laboriosam quasi odio harum nostrum, quo expedita molestias!
    Hic incidunt esse quibusdam, ipsam aperiam reprehenderit nemo commodi repellat deserunt ab culpa minus sapiente assumenda voluptatibus nulla accusantium veniam porro. Nisi, tempora ex possimus eum corporis labore consequuntur ad!
    Porro rem delectus iste! Dolor nulla exercitationem vero aspernatur cum incidunt. Autem laudantium eius, fugiat perferendis recusandae culpa totam asperiores aperiam. Incidunt consequatur ipsum nemo delectus? Iste qui optio deserunt!
    Magnam porro reprehenderit unde voluptate, aliquid debitis! Debitis voluptatem id delectus amet, nostrum accusantium perspiciatis sequi laborum dignissimos impedit ducimus quidem minus porro ullam. Excepturi delectus dignissimos officia alias a!" />} />
                <Route
                  path="/quiz"
                  element={<QuizPage videoTitle="Sample Quiz" questions={dummyQuestions} />}
                />
            </Routes>
    </Router>
    
  )
}

export default App
