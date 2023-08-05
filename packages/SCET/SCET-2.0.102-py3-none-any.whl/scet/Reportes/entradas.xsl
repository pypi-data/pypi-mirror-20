<?xml version="1.0" encoding="UTF-8"?>

<!-- New XSLT document created with EditiX XML
Editor (http://www.editix.com) at Mon Nov 10 10:11:33 VET 2014 -->

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" >
    <xsl:output method="html"/>
    <xsl:param name="base"/>

    <xsl:template match="/">
        <html>
            <head>
                <xsl:if test='$base'>
                    <base href='{$base}' target='_blank' />
                </xsl:if>
                <meta charset='UTF-8'/>
                <link rel="stylesheet" type="text/css" href="estandar.css"/>
                <title>Entrada de Taller <xsl:value-of select='//idEntradas'/></title>
            </head>
            <body>
                <xsl:apply-templates select='Reporte'/>
                <xsl:apply-templates select='Reporte'/>
            </body>
        </html>
    </xsl:template>

    <xsl:template match="Reporte">
        <div class='reporte'>
            <div class='contenedor'>
                <xsl:apply-templates select='Entradas'/>
            </div>
            <div class='pie'>
                <p class='acuerdo'>
                    <p class='titulo'>Clausulas de Servicio</p>
                    <ul class='clausulas'>
                        <xsl:for-each select='Entradas/Empresas/Entidades/Caracteristicas[tipo="Clausula"]'>
                            <li><xsl:value-of select='valor'/></li>
                        </xsl:for-each>
                    </ul>
                </p>
                <p class='metadatos'>Guarde este recivo para facilitar el proceso de entrega</p>
            </div>
        </div>
    </xsl:template>

    <xsl:template match="Entradas">
        <div class='cabeza'>
            <div class='empresa'>
                <xsl:apply-templates select='Empresas'/>
            </div>
            <div class='estandar'>
                <h1 class='titulo'>Entrada Taller</h1>
                <div class='datos'>
                    <div class='identificacion'>
                        <span class='titulo'>Numero Entrada:&#160;</span>
                        <span class='valor'><xsl:value-of select='idEntradas'/></span>
                    </div>
                    <div class='fecha'>
                        <span class='titulo'>Fecha:&#160;</span>
                        <span class='valor'>
                            <xsl:apply-templates select='fecha'/>
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <div class='cuerpo'>
            <div class='cliente'>
                <xsl:apply-templates select='Clientes'/>
            </div>
            <div class='tecnico'>
<!--
                <xsl:apply-templates select='Tecnicos'/>
-->
                <h2 class='firma'>Tecnico:</h2>
            </div>
            <div class='equipos'>
                <table>
                    <thead>
                        <tr>
                            <th>Equipo</th>
                            <th>Marca</th>
                            <th>Modelo</th>
                            <th>Serial</th>
                            <th>Descripción</th>
                        </tr>
                    </thead>
                    <tbody>
                        <xsl:apply-templates select='Trabajos'/>
                    </tbody>
                </table>
            </div>
        </div>
    </xsl:template>

    <xsl:template match="Empresas">
        <div class='logo'>
            <img class='imagen' src="logo.png" />
        </div>
        <div class='informacion'>
            <xsl:apply-templates select='Entidades/Informacion_Fiscal'/>
        </div>
        <div class='contactos'>
            <xsl:apply-templates select='Entidades/Contacto'/>
        </div>
    </xsl:template>

    <xsl:template match="Informacion_Fiscal">
        <span class='razon'><xsl:value-of select='razon_social'/></span>
        <span class='rif'>
            R.I.F.:&#160;
            <xsl:value-of select='rif_tipo'/>
            –
            <xsl:value-of select='format-number(rif_numero, "0")'/>
            <xsl:if test='rif_final != "None"'>
                –
                <xsl:value-of select='format-number(rif_final, "0")'/>
            </xsl:if>
        </span>
        <p class='direccion'>
            <xsl:value-of select='direccion'/>
            &#160;–&#160;
            <xsl:value-of select='ciudad'/>
            &#160;–&#160;
            <xsl:value-of select='estado'/>
        </p>
    </xsl:template>

    <xsl:template match="Contacto">
        <div class="contacto">
            <span class='tipo'><xsl:value-of select='tipo'/>:&#160;</span>
            <span class='valor'><xsl:value-of select='valor'/></span>
        </div>
    </xsl:template>

    <xsl:template match="Tecnicos">
        <h2 class='firma'>Tecnico:</h2>
    </xsl:template>

    <xsl:template match="Clientes">
        <h2 class='firma'>Cliente:</h2>
        <div class='informacion'>
            <xsl:apply-templates select='Entidades/Informacion_Fiscal'/>
        </div>
        <div class='contactos'>
            <xsl:apply-templates select='Entidades/Contacto'/>
        </div>
    </xsl:template>

    <xsl:template match="Trabajos">
        <tr>
            <xsl:apply-templates select='Equipos'/>
        </tr>
    </xsl:template>

    <xsl:template match="Equipos">
            <xsl:apply-templates select='Objetos'/>
    </xsl:template>

    <xsl:template match="Objetos">
        <td><xsl:value-of select='nombre'/></td>
        <xsl:apply-templates select="Especificaciones[tipo='Marca']"/>
        <xsl:apply-templates select="Especificaciones[tipo='Modelo']"/>
        <xsl:apply-templates select="Especificaciones[tipo='Serial']"/>
        <td>
            <xsl:for-each select="Especificaciones[tipo!='Marca' and tipo!='Modelo' and tipo!='Serial']">
                <span class='descripcion'><span class='tipo'><xsl:value-of select='tipo'/></span>:<xsl:value-of select='valor'/></span>
            </xsl:for-each>
        </td>
    </xsl:template>

    <xsl:template match="Especificaciones">
        <td><xsl:value-of select='valor'/></td>
    </xsl:template>

    <xsl:template match="fecha">
        <xsl:value-of select="dia"/>
        –
        <xsl:value-of select="mes"/>
        –
        <xsl:value-of select="ano"/>
    </xsl:template>

</xsl:stylesheet>
