import React, { useState, useEffect }  from "react"
import MainGrid from "../src/components/MainGrid"
import Box from "../src/components/Box"
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from "../src/lib/AlkutCommons"
import { ProfileRelationsBoxWrapper } from "../src/components/ProfileRelations"

function ProfileSidebar(user) {
  return (
    <Box as="aside">
      <img src={`https://www.github.com/${user.githubUser}.png`} style={{ borderRadius: "8px" }} />
      <hr />
      <p>
        <a className="boxLink" href={`https://github.com/${user.githubUser}`}>
          @{user.githubUser}
        </a>
      </p>
      <hr />
      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

function ProfileRelationsBox(propriedades) {
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">{propriedades.title} ({propriedades.data.length})</h2>
      <ul>
        {propriedades.items.map((item) => {
          return (
            <li key={item.id}>
              <a href={item.html_url}>
                <img src={item.avatar_url} />
                <span>{item.login}</span>
              </a>
            </li>
          )
        })}
     </ul>
    </ProfileRelationsBoxWrapper>
  )
}

export default function Home() {

  const showProfileRelationsStatic = ((data, exhibition) => {
    let i = 1
    while (exhibition.length < 6 && exhibition.length != data.length) {
      exhibition.push(data[data.length - i])
      i++
    } i = 1
    return exhibition
  })

  const showProfileRelationsDynamic = ((data, exhibition) => {
    if (data.length > 6) {
      exhibition = data.slice(data.length-6, data.length)
    } else {
      return data
    } return exhibition
  })

  const username = "tomasfn87"
  
  const [ dadosSeguidores, setDadosSeguidores ] = useState([])

  const [ seguidores, setSeguidores ] = useState([])
  
  useEffect(function() {
    fetch("https://api.github.com/users/peas/followers")
    .then(function (response) {
        if (response.ok) {
            return response.json()
        }
        throw new Error("Aconteceu algum problema :" + response.status)
    })
    .then(function(convertedResponse) {
        setDadosSeguidores(convertedResponse)
    })
    .catch(function (erro) {
        console.error(erro)
    })
  }, [])

  showProfileRelationsDynamic(dadosSeguidores, seguidores)

  useEffect(() => {  
    setSeguidores(showProfileRelationsDynamic(dadosSeguidores, seguidores))
  },[dadosSeguidores])

  let [ dadosComunidades, setDadosComunidades ] = useState(
    [
      {
        id: "2021-01",
        title: "Nunca fiz amigos bebendo leite",
        avatar: "https://i.pinimg.com/474x/42/1f/4c/421f4c444aea94849528a50a4794b9e0.jpg"
      },
      /* {
        id: "2021-02",
        title: "Garfield, meu ídolo",
        avatar: "https://observatoriodocinema.uol.com.br/wp-content/uploads/2020/12/Garfield-capa.jpeg"
      }, */
      {
        id: "2021-03",
        title: "Sapo Cururu",
        avatar: "https://ferdinandodesousa.files.wordpress.com/2019/08/sapo-cururu.jpg"
      },
      {
        id: "2021-04",
        title: "Eu tinha uma Minnie ou um Mickey de pelúcia",
        avatar: "https://cdn.awsli.com.br/600x450/297/297688/produto/37175417/682fe49ddf.jpg"
      },
      {
        id: "2021-05",
        title: "Filmes de domingo depois do almoço",
        avatar: "https://br.web.img3.acsta.net/medias/nmedia/18/90/18/85/20085012.jpg"
      },
      /* {
        id: "2021-06",
        title: "Flango macalão",
        avatar: "https://static.clubedaanamariabraga.com.br/wp-content/uploads/2019/08/frango-com-macarrao-de-vo.jpg"
      } */
    ])
  
  const [ comunidades, setComunidades ] = useState([])
  // showProfileRelations(dadosComunidades, comunidades)

  showProfileRelationsDynamic(dadosComunidades, comunidades)

  let comunidade
  
  useEffect(() => {
    setComunidades(showProfileRelationsDynamic(dadosComunidades, comunidades))
  }, [dadosComunidades])

  let dadosPessoasFavoritas = [
    "felipefialho",
    "marcobrunodev",
    "peas",
    "omariosouto",
    "rafaballerini",
    "juunegreiros",
    "GuillaumeFalourd",
    "produtocamila"
  ]

  let pessoasFavoritas = []
  showProfileRelationsStatic(dadosPessoasFavoritas, pessoasFavoritas)
  
  /* 0 - Pegar o array de dados do GitHub */

  // console.log(dadosSeguidores)

  /* 1 - Criar um box que vai ter um map, baseado nos itens do array
  que veio do GitHub */
      
  return (
    <div>
      <AlurakutMenu githubUser={username}/>

      <MainGrid>
        <div className="profileArea" style={{ gridArea: "profileArea" }}>
          <ProfileSidebar githubUser={username} />
        </div>

        <div className="welcomeArea" style={{ gridArea: "welcomeArea" }}>
          <Box>
            <h1 className="title">Bem vindo(a)</h1>
            <OrkutNostalgicIconSet />
          </Box>

          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form onSubmit={function handleCriaComunidade(e) {
              e.preventDefault()
             
              const dadosDoForm = new FormData(e.target)
              
              console.log(comunidade)

              comunidade = {
                id: new Date().toISOString(),
                title: dadosDoForm.get("title"),
                avatar: dadosDoForm.get("avatar")
              }
              
              dadosComunidades = setDadosComunidades([...dadosComunidades, comunidade])
            }}>

              <div>
                <input
                  placeholder="Qual será o nome da nova comunidade?"
                  name="title"
                  aria-label="Qual será o nome da nova comunidade?"
                />
              </div>
              <div>
                <input
                  placeholder="Coloque a URL de uma imagem de capa"
                  name="avatar"
                  aria-label="Coloque a URL de uma imagem de capa"
                />
              </div>
              <button>
                Criar comunidade
              </button>
            </form>
          </Box>
        </div>

        <div className="profileRelationsArea" style={{ gridArea: "profileRelationsArea" }}>
          
          <ProfileRelationsBox title="Seguidores GitHub" items={seguidores} data={dadosSeguidores} />

          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">Minhas comunidades ({dadosComunidades.length})</h2>
            <ul>
              {comunidades.map((item) => {
                return (
                  <li key={item.id}>
                    <a href={`/groups/${item.title}`}>
                      <img src={`${item.avatar}`} />
                      <span>{item.title}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>

          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">Meus amigos ({dadosPessoasFavoritas.length})</h2>
            {/* O $ só séria usado de dentro de uma string, aqui no caso está sendo usado diretamente. */}
            <ul>
              {pessoasFavoritas.map((item) => {
                return (
                  <li key={item}>
                    <a href={`https://github.com/${item}`}>
                      <img src={`https://github.com/${item}.png`} />
                      <span>{item}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
          
        </div>
      </MainGrid>
    </div>
  )
}