
const a = (name: string, prepopulation: number) => ({name, prepopulation})

export const art = {
	indicator: a("indicator", 1),
	phasebox: a("phasebox", 1),
	phaseboxAngry: a("phasebox-angry", 1),

	floor1: a("floor1", 256),
	wall1: a("wall1", 64),
	wall2: a("wall2", 64),
	wall3: a("wall3", 64),
	wall4: a("wall4", 64),
	wall5: a("wall5", 64),
	wall6: a("wall6", 64),

	projectileBeam: a("projectile-beam", 32),
	projectilePulse: a("projectile-pulse", 32),

	lowerHover: a("lower-hover", 16),
	lowerTrike: a("lower-trike", 16),
	lowerQuadcar: a("lower-quadcar", 16),
	lowerTreads: a("lower-treads", 16),

	upperScout: a("upper-scout", 16),
	upperPragmatist: a("upper-pragmatist", 16),
	upperUtilitarian: a("upper-utilitarian", 16),
	upperChonky: a("upper-chonky", 16),
	upperDapper: a("upper-dapper", 16),

	aCannon: a("a-cannon", 16),
	aDrill: a("a-drill", 16),
	bDome: a("b-dome", 16),

	oreCarbon: a("ore-carbon", 16),
	oreColtan: a("ore-coltan", 16),
	oreGold: a("ore-gold", 16),

	ingotTantalum: a("ingot-tantalum", 16),
	ingotGold: a("ingot-gold", 16),

	structHub: a("struct-hub", 16),
	structRefinery: a("struct-refinery", 16),
	structConstructor: a("struct-constructor", 16),
}

