import MainGrid from "../src/components/MainGrid"
import Box from "../src/components/Box"
import { AlurakutMenu, OrkutNostalgicIconSet } from "../src/lib/AlkutCommons"
import { ProfileRelationsBoxWrapper } from "../src/components/ProfileRelations"

function ProfileSidebar(user) {
  console.log(user)
  return (
    <Box>
      <img src={`https://www.github.com/${user.githubUser}.png`} style={{ borderRadius: "8px" }} />
    </Box>
  )
}

// const Title = styled.h1`
//   font-size: 50px;
//   color: ${({ theme }) => theme.colors.primary};
// `

export default function Home() {
  const username = "tomasfn87";
  const pessoasFavoritas = ["juunegreiros",
                            "omariosouto",
                            "rafaballerini",
                            "marcobrunodev",
                            "peas",
                            "felipefialho"
                          ]

  return (
    <div>
      <AlurakutMenu />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: "profileArea" }}>
          <ProfileSidebar githubUser={username} />
        </div>

        <div className="welcomeArea" style={{ gridArea: "welcomeArea" }}>
          <Box>
            <h1 className="title">Bem vindo(a)</h1>
            <OrkutNostalgicIconSet />
          </Box>
        </div>

        <div className="profileRelationsArea" style={{ gridArea: "profileRelationsArea" }}>
          <ProfileRelationsBoxWrapper>
          <h2 className="smallTitle">Pessoas da comunidade ({pessoasFavoritas.length})</h2>
          {/* O $ só séria usado de dentro de uma string, aqui no caso está sendo usado diretamente. */}
            <ul>
              {pessoasFavoritas.map((item) => {
                return (
                  <li>
                    <a href={`/users/${item}`} key={item}>
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